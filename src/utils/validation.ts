export const validateNewPassword = (password:string) : string => {
    return password.length < 6 ? 'La contraseña debe tener más de 6 caracteres' : '';
}