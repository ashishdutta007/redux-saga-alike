const testFunc = (name) => {
  return {
    name: name,
    getName: () => {
      console.log("this.name ", this);
    }
  };
};

const obj = testFunc("asd");

obj.getName();
