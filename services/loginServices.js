function getAutorizathion() {
  const authId = localStorage.getItem("authorization");
  if (authId == "" || authId == null) {
    return "no autorizado";
  } else if (authId == "67b0735a-08d6-4ae0-afef-efde5664e46c") {
    return "administrador";
  } else {
    return "usuario";
  }
}

function getAutorizathionId() {
  return localStorage.getItem("authorization");
}

function setAuthorization(id) {
  localStorage.setItem("authorization", id);
}

export const loginServices = {
  getAutorizathion,
  getAutorizathionId,
  setAuthorization,
};
