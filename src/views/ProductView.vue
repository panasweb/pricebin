<template>
  <div>
    <div class="container">
      <div class="row">
        <img :src="productImg" class="productI" />
      </div>
      <div class="row">
        <div class="marca">
          <h4>{{ currentP?.brand }}</h4>
        </div>
        <div class="favoritos"><img src="@/assets/heart.svg" /></div>
        <h3 style="font-weight: bold">{{ currentP?.name }}</h3>
        <h3 v-if="currentP">
          Precio mas bajo: <span>
            {{ toCurrency(currentP!.prices[0].amount, store) }}
          </span>

        </h3>
      </div>
      <div class="prices-container">
        <div v-for="p in sortedPrices" :key="p.store" class="row" style="font-weight: bold">
          <div class="col">
            <img :src="storeLogo" class="logo" />
            <p>{{ p.store }}</p>
          </div>
          <div class="col price">
            <!-- {{CURRENCY_SYMBOLS[store?.currency||"MXN"]}} 
            {{ store?.getConvertedAmount ? store?.getConvertedAmount(p.amount).toFixed(2) : p.amount }} -->
            {{ toCurrency(p.amount, store) }}
            <div class="priceInfo">
              <div class="price-date">{{ (p.date as Date).toLocaleDateString('es-ES', {
                  day: 'numeric', year: 'numeric',
                  month: 'short'
                })
              }}</div>
              <div v-if="!hasvoted[p._id!]" class="priceVotes">
                <span @click="vote(p._id!)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM9.41935 11.7419V8H11.7065C12.0516 8 12.2258 7.58064 11.9806 7.33871L8.27419 3.65161C8.12258 3.5 7.88065 3.5 7.72903 3.65161L4.01935 7.33871C3.77419 7.58387 3.94839 8 4.29355 8H6.58065V11.7419C6.58065 11.9548 6.75484 12.129 6.96774 12.129H9.03226C9.24516 12.129 9.41935 11.9548 9.41935 11.7419Z"
                      id="unvoted" />
                  </svg>
                </span>
                x{{ priceVotes[p._id!] }}
              </div>
              <div v-else class="priceVotes">
                <span @click="unvote(p._id!)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM9.41935 11.7419V8H11.7065C12.0516 8 12.2258 7.58064 11.9806 7.33871L8.27419 3.65161C8.12258 3.5 7.88065 3.5 7.72903 3.65161L4.01935 7.33871C3.77419 7.58387 3.94839 8 4.29355 8H6.58065V11.7419C6.58065 11.9548 6.75484 12.129 6.96774 12.129H9.03226C9.24516 12.129 9.41935 11.9548 9.41935 11.7419Z"
                      id="voted" />
                  </svg>
                </span>
                x{{ priceVotes[p._id!] }}
              </div>
            </div>

          </div>
          <div class="quantity col">
              <button class="add col" @click="lessFunction(p.store)">-</button>
              <p>{{quantity.get(p.store)}}</p>
            <button class="add col" @click="addFunction(p.store)">+</button>
          </div>
          <div class="col">
            <button class="btn btn-secondary quantity" @click="addToList(p)">Añadir a lista</button>
          </div>
          
          <div v-if="isAdmin" class="del-price-btn">
            <button @click="deletePrice(p)">Borrar precio</button>
          </div>
        </div>

      </div>
      <router-link :to="{
        name: 'add price',
        params: {
          prefill: productFormData,
        },
      }">
        <button class="btn btn-primary w-100">
          <n-icon size="25" :component="PriceChangeFilled"></n-icon>
          Registrar un precio
        </button>
      </router-link>
      <button v-if="isAdmin" class="btn btn-secondary w-100 mt-2" @click="handleDelete">
        <n-icon size="25" :component="DeleteForeverRound"></n-icon>
        Borrar producto
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, inject } from "vue";
import { Product } from "../types/interfaces/Product";
import { DEFAULT_LOGO_SVG, DEFAULT_PRODUCT_IMG, ADMIN_RANK, CURRENCY_SYMBOLS } from "../utils/constants";
import { useRoute, useRouter } from "vue-router";
import { auth } from "../services/auth";
import ProductManager from "@/models/ProductManager";
import VotesManager from "@/models/VotesManager";
import Price from "@/types/interfaces/Price";
import UserManager from "@/models/UserManager";
import ListRecord from "@/types/ListRecord";
import { onAuthStateChanged } from "@firebase/auth";
import IStore from "@/types/IStore";
import { NIcon } from "naive-ui";
import { serializePrices, byVotesThenDateThenAmount, toCurrency } from '../utils/misc'
import { DeleteForeverRound, PriceChangeFilled } from '@vicons/material'

const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
const route = useRoute();
const currentP = ref<Product | null>();
const productFormData = ref<string>("");
const priceVotes = ref<Record<string, number>>({});
const hasvoted = ref<Record<string, boolean>>({});
const productImg = ref<string>(DEFAULT_PRODUCT_IMG);
const router = useRouter();
const isAdmin = ref<boolean>(false);
const sortedPrices = ref<Price[]>([]);
const quantity = ref <Map<string, number>>(new Map());

const store: IStore | undefined = inject('store');

function redirectProducts() {
  router.push({ name: "products" });
}
function redirectNotFound() {
  router.push({ name: "404", replace: true });
}
function redirectToLogin() {
  router.push({ name: "login" });
}
function redirectToList() {
  router.push("/myproducts/");
}

function setPrices(): void {
  sortedPrices.value = serializePrices(currentP.value!.prices, priceVotes.value).sort(byVotesThenDateThenAmount);
  console.log("Set sorted prices");
  console.log(sortedPrices.value);
}

async function fetchProduct(): Promise<string[]> {
  /* Update product, prices list and price votes count */
  currentP.value = await ProductManager.getProduct(route.params.id as string);

  const priceIds = Array.from(
    currentP.value!.prices!,
    (price: Price) => price._id!
  );

  priceVotes.value = await VotesManager.getVoteCounts(priceIds as string[]);

  setPrices(); // update sortedPrices.value

  return priceIds;
}

async function updateHasVoted(priceIds: string[]): Promise<void> {
  let result: boolean;
  if (!auth.currentUser) {
    return;
  }
  priceIds.forEach(async (pid) => {
    result = await checkUserVote(auth.currentUser!.email!, pid);
    hasvoted.value[pid] = result
  });
}

onBeforeMount(async () => {

  const priceIds = await fetchProduct();

  console.dir(currentP.value);

  if (!currentP.value) {
    redirectNotFound();
    return;
  }

  // Get booleans has User Voted?
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Update vote buttons color
      await updateHasVoted(priceIds);
      //Initialize numbers arrays for priceIds with 1
      currentP.value!.prices!.forEach((pid) => {
        quantity.value.set(pid.store, 0);
      });

      // Set Admin Privileges
      const adminUser = await UserManager.getByEmail(auth.currentUser!.email!);
      if (!adminUser) {
        console.error("ERROR: CURRENT USER NOT EXISTS IN MONGO");
        return;
      }
      isAdmin.value = adminUser.rank === ADMIN_RANK
      console.log("isAdmin?", isAdmin.value);
    }
  })

  if (currentP.value?.img) {
    productImg.value = currentP.value.img;
  }

  const objectData: any = {
    productName: currentP!.value?.name,
    brandName: currentP!.value?.brand,
    productType: currentP!.value?.type,
    productId: route.params.id as string,
  };
  productFormData.value = JSON.stringify(objectData);

});

async function deletePrice(price: Price): Promise<void> {

  const priceId = price._id!
  console.log("Price Id", priceId);

  if (!auth.currentUser) {
    redirectToLogin();
    return;
  }

  if (!isAdmin.value) {
    console.log("Insufficient Permissions");
    return;
  }

  if (!store || !store.currentUser) {
    console.log("No currentUser in store!");
  }

  if (confirm(`¿Borrar este precio $${price.amount}?`) != true) {
    return;
  }

  try {
    const UserKey = store!.currentUser!._id!;
    const productId = route.params.id as string;

    await ProductManager.adminDeletePrice(UserKey, productId, priceId);
    await fetchProduct();

  } catch (e) {
    console.error(e);
  }
}

async function handleDelete(e: MouseEvent): Promise<void> {
  console.log("Store currentUser test", store!.currentUser);
  if (!auth.currentUser) {
    redirectToLogin();
    return;
  }

  if (!isAdmin.value) {
    console.log("Insufficient Permissions");
    return;
  }

  if (!store || !store.currentUser) {
    console.log("No currentUser in store!");
  }

  if (confirm(`¿Borrar Producto ${currentP.value?.name}?`) != true) {
    return;
  }

  try {
    await ProductManager.adminDeleteProduct(store!.currentUser!._id!, route.params.id as string);

    redirectProducts();
  } catch (e) {
    console.error(e);
    return;
  }
}


async function vote(priceId: string): Promise<void> {
  console.log("auth.currentUser", auth.currentUser);

  // Change svg id to voted
  priceVotes.value[priceId] += 1;
  hasvoted.value[priceId] = true
  console.log("votando");
  if (!auth.currentUser) {
    redirectToLogin();
    return;
  }
  await VotesManager.addVote(auth.currentUser.email!, priceId);
}

async function unvote(priceId: string): Promise<void> {
  console.log("currentUser", auth.currentUser!.email);
  priceVotes.value[priceId] -= 1;
  hasvoted.value[priceId] = false
  console.log("eliminar voto ");
  if (!auth.currentUser) {
    redirectToLogin();
    return;
  }
  await VotesManager.deleteVote(auth.currentUser.email!, priceId);
}

async function checkUserVote(userEmail: string, priceId: string): Promise<boolean> {
  return await VotesManager.checkUserVote(userEmail, priceId);
}

async function addToList(price: Price): Promise<void> {
  let productRecord: ListRecord | null = null;
  console.log("click");

  if (!auth.currentUser) {
    redirectToLogin();
  }

  if (currentP.value) {
    productRecord = {
      productName: currentP!.value?.name,
      storeName: price.store,
      brandName: currentP!.value?.brand,
      amount: price.amount,
      quantity: quantity.value.get(price.store) as number,
    };
    console.log(productRecord);
    await UserManager.addProduct(productRecord, auth.currentUser!.email!);
    redirectToList();
  }
}

async function addFunction(store: string): Promise<void> {
  if (quantity.value != undefined && quantity.value.has(store)) {
    let temp: number = quantity.value.get(store)!;
    quantity.value.set(store, temp + 1);
  }
  console.log(quantity.value.get(store));
  return;
}
async function lessFunction(store: string): Promise<void>{
  if (quantity.value != undefined && quantity.value.has(store) && quantity.value.get(store)! > 0) {
    let temp: number = quantity.value.get(store)!;
    quantity.value.set(store, temp - 1);
  }
  console.log(quantity.value.get(store));
  return;
}




</script>

<style scoped>
.logo {
  height: 30px;
  margin-bottom: 10px;
}

.productI {
  height: 100px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 15px;
}

* {
  text-align: left;
}

.container {
  width: 40%;
  margin-top: -40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.row {
  margin: 25px 0;
}

.favoritos {
  width: 5%;
}

.marca {
  width: 90%;
}

.prices-container {
  border-style: solid;
  border-color: #46178f;
  margin: 25px 0;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.price {
  text-align: right;
  font-weight: bold;
  font-size: 30px;
}

.add {
  color: #f76d66;
  font-weight: bolder;
  font-size: 50px;
  background-color: transparent;
  border-color: transparent;
  max-width: 50px;
  margin: 5px;
}

button {
  text-align: center;
}

.row {
  width: 100%;
  justify-content: space-between;
}

span {
  color: #1dc202;
}

.priceVotes {
  font-size: 11px;
  text-align: inherit;
  color: #444;
}

.priceVotes:hover #unvoted {
  fill: #f76d66;
  transition: 0.3s;
  cursor: pointer;
}

#unvoted {
  fill: black;
}

#voted {
  fill: #f76d66;
}

.price-date {
  font-size: 12px;
  color: #888;
  margin: 0 !important;
  text-align: inherit;
}

.priceInfo {
  text-align: inherit;
}

.quantity{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

@media only screen and (max-width: 700px) {
  .container {
    width: 100%;
    margin-top: -40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .favoritos {
    width: 5%;
  }

  .marca {
    width: 90%;
  }

  .prices-container {
    border-style: solid;
    border-color: #46178f;
    margin: 25px 0;
    padding: 20px;
    border-radius: 5px;
  }

  .price {
    text-align: right;
    font-weight: bold;
    font-size: 30px;
  }

  button {
    text-align: center;
  }

  .row {
    margin: 25px 0;
    width: 100%;
    justify-content: space-between;
  }

  span {
    color: #1dc202;
  }
}
</style>