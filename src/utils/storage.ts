class StorageData {
  constructor() {}
  saveData(key: string, value: any) {
    try {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  removeData(key: string) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  dataExist(key: string) {
    const data = this.getData(key);
    if (data) {
      return true;
    }
    return false;
  }
  getData = (key: string) => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    }
    return null;
  };
}
const storageData = new StorageData();

export default storageData;
