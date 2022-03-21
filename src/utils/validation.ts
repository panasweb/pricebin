export const validateNewPassword = (password:string) : string => {
    return password.length > 5 ? '' : 'La contraseña debe tener más de 6 caracteres';
}