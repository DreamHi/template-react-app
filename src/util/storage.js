import sjcl from 'sjcl';

class Storage {
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isAuthenticatedUser() {
    return localStorage.getItem('token') !== null;
  }

  static removeAuthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static setUser(user) {
    const encrypt = sjcl.encrypt('user', JSON.stringify(user));
    localStorage.setItem('user', encrypt);
  }

  static getUser() {
    try {
      const decrypt = sjcl.decrypt('user', localStorage.getItem('user'));
      return JSON.parse(decrypt);
    } catch (e) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { primaryGroup: {} };
    }
  }

  static delUser() {
    localStorage.removeItem('user');
  }
}

export default Storage;
