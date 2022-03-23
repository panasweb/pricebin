import md5 from 'md5'  // must add @types/md5

export const getGravatarURL = (email: string) => {
    return `https://gravatar.com/avatar/${md5(email)}?s=128`;
}