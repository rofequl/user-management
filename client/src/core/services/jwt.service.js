const ID_TOKEN_KEY = 'id_token_user'
export const getToken = () => {
  const itemStr = localStorage.getItem(ID_TOKEN_KEY)
  if (!itemStr) return null
  const item = JSON.parse(itemStr)
  const now = new Date()
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(ID_TOKEN_KEY)
    return null
  }
  return item.value
}

export const saveToken = (token) => {
  const now = new Date();
  window.localStorage.setItem(
    ID_TOKEN_KEY,
    JSON.stringify({value: token, expiry: now.getTime() + 86400000})
  );
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default {getToken, saveToken, destroyToken};
