export const testMama = (name) => {
  debugger;
  console.log("test mama called");
  return {
    name: name,
    getName: () => {
      console.log("this.name ", this);
    }
  };
};

// const obj = testMama("asd");
// obj.getName();
