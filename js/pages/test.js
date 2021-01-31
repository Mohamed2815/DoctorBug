let myRequest = new XMLHttpRequest();

myRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log(this.responseText);
  }
};
myRequest.open("GET", "test.json", true);
myRequest.send();
