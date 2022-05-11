const authorization = "";
function getAutorizathion() {
  return localStorage.getItem("authorization");
}

function setAuthorization(id) {
  localStorage.setItem("authorization", id);
}

export const loginServices = {
  getAutorizathion,
  setAuthorization,
};
