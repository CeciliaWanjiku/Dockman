class Authenticate {
  static loggedIn() {
    return !!sessionStorage.jwt;
  }

  static logOut() {
    sessionStorage.removeItem('jwt');
  }
}

export default Authenticate;
