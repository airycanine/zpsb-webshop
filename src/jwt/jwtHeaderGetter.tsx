export default function authHeader() {
  // @ts-ignore
  const accessToken = JSON.parse(localStorage.getItem("user"));
  if (accessToken) {
    // for Node.js Express back-end
    // @ts-ignore
    return { Authorization: "Bearer " + accessToken.token };
  } else {
    return {};
  }
}
