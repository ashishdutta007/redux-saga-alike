export const testMama = (name) => {
  return {
    name: name,
    getName: () => {
      console.log("this.name ", this);
    }
  };
};

const obj = testMama("asd");
obj.getName();
