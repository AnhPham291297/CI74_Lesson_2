/*
// Bai 1. Viết một function đảo ngược một string bất kỳ, sử dụng các phương thức của array.
// Input: "abcdef";
// Ouput: "fedcba";

const sortString = function (string) {
  // let newString = string.split("").reverse().join("");
  // return newString;

  let newString = [...string].reverse().join("");
  return newString;
};
console.log(sortString("abcdef"));
*/

/*----------------------------------------------*/
/*
// Bai 2. Viết một function xoá các phần từ trùng lặp trong một mảng các số:
// Input: [1, 2, 3, 5, 4, 2, 6, 4];
// Output: [1, 2, 3, 5, 4, 6];

function removeDuplicates(data) {
  return data.filter((value, index) => data.indexOf(value) === index);
}

console.log(removeDuplicates([1, 2, 3, 5, 4, 2, 6, 4]));
*/

/*----------------------------------------------*/
/*
// Bai 3. Viết một chương trình lấy phần tử xuất hiện nhiều nhất trong một mảng và số lần suất hiện của nó trong mảng:
// Input: [1, 2, 3, 5, 6, 4, 2, 1, 6, 3, 5, 3]
// Output: {value: 3, count: 3}

// Cach 1:
// tạo hàm tìm phần tử xuất hiện nhiều nhất trong mảng JavaScript
function array_unique(array) {
  array.sort();

  let max = [0, 0];

  //Sử dụng vòng lặp for để lọc ra các phần tử xuất hiện nhiều hơn 1 lần
  //So sánh số lần xuất hiện và thay đổi max khi cần.
  let count = 1;
  for (let i = array.length - 1; i > 0; --i) {
    if (array[i] == array[i - 1])
      ++count; //Thấy phần tử trùng nhau thì tiếp tục đếm
    else {
      //So sánh số lần xuất hiện với max[1]
      if (max[1] < count) {
        //Nếu tìm thấy phần tử xuất hiện nhiều hơn thì gán phần tử vào max[0]
        //Và gán số lần xuất hiện vào max[1]
        max[0] = array[i];
        max[1] = count;
      }
      count = 1;
    }
  }
  console.log(
    "Phần tử " + max[0] + " xuất hiện nhiều nhất với " + max[1] + " lần"
  );
}

let array = [1, 2, 3, 5, 6, 4, 2, 1, 6, 3, 5, 3];
//Tìm phần tử xuất hiện nhiều nhất trong mảng JavaScript
array_unique(array);

// Cach 2:
let arr1 = [1, 2, 3, 5, 6, 4, 2, 1, 6, 3, 5, 3];
let mf = 1;
let m = 0;
let item;
for (let i = 0; i < arr1.length; i++) {
  // console.log(arr1[i]);
  for (let j = i; j < arr1.length; j++) {
    // console.log(arr1[i]);
    if (arr1[i] == arr1[j]) m++;
    // console.log(arr1[i], arr1[j], m);
    if (mf < m) {
      mf = m;
      item = arr1[i];
      // console.log(mf, m, item);
    }
  }
  m = 0;
}
console.log(`${item} ( ${mf} lần ) `);
*/

// Bai 4:
const $ = document.querySelector.bind(document);
const api = "https://62660e73dbee37aff9ab8132.mockapi.io/api/contacts";
const appContact = {
  // Function get API
  getApi(callback) {
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((contacts) => {
        callback(contacts);
      });
  },
  // Functon Render
  renderContacts(contacts) {
    const listContacts = $(".list-contacts");
    const htmls = contacts.map((e) => {
      return `
            <li>
               ${e.name}
               <span>${e.numberPhone}</span>
            </li>
         `;
    });
    listContacts.innerHTML = htmls.join("");
  },
  // Function handle create contacts
  handleCreateContacts() {
    const btnCreate = $(".btn-create");
    btnCreate.addEventListener("click", () => {
      const nameContact = $(".name-contact").value;
      const numberPhone = $(".number-phone").value;
      if (nameContact !== "" && numberPhone !== "") {
        const data = {
          name: nameContact,
          numberPhone: numberPhone,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        fetch(api, options)
          .then((response) => {
            return response.json();
          })
          .then((contact) => {
            const listContacts = $(".list-contacts");
            const li = document.createElement("li");
            const textContent = `
                     ${contact.name}
                     <span>${contact.numberPhone}</span>
                  `;
            li.innerHTML = textContent;
            listContacts.appendChild(li);
          });
      }
      $(".name-contact").value = "";
      $(".number-phone").value = "";
    });
  },
  // Function search contacts
  handleSearchContact() {
    const btnSearch = $(".btn-search");
    const inputSearch = $(".input-search");
    inputSearch.onchange = () => {
      this.getApi((contacts) => {
        inputSearch.onclick = () => {
          this.renderContacts(contacts);
        };
        btnSearch.onclick = () => {
          const arrContacts = contacts;
          const contactSearch = arrContacts.filter((e) => {
            return e.name
              .toLowerCase()
              .includes(inputSearch.value.toLowerCase());
          });
          this.renderContacts(contactSearch);
          inputSearch.value = "";
        };
      });
    };
  },
  // Function Filter element exist
  filterElementExits(arr, key) {
    const newArr = arr
      .map((e) => e[key])
      .map((e, i, arr) => arr.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return newArr;
  },
  // Function get ID contacts
  getIdContacts(contacst) {
    const idContacts = contacst.map((e) => e.id);
    return idContacts;
  },

  // Function Method detele api

  deleteApi(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(api + "/" + id, options);
  },
  // Function delete already exits
  handleDelete() {
    const btnDelete = $(".btn-delete");
    btnDelete.onclick = () => {
      this.getApi((contacts) => {
        const newContacts = this.filterElementExits(contacts, "numberPhone");
        this.renderContacts(newContacts);
        const id = this.getIdContacts(newContacts);
        contacts.forEach((e) => {
          const isExits = id.some((d) => e.id === d);
          if (!isExits) {
            this.deleteApi(e.id);
          }
        });
      });
    };
  },

  // Function starts
  starts() {
    this.getApi((contacts) => {
      this.renderContacts(contacts);
    });
    this.handleCreateContacts();
    this.handleSearchContact();
    this.handleDelete();
  },
};
appContact.starts();
