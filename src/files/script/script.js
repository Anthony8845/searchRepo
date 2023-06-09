import { Octokit } from "https://esm.sh/octokit";

const repositories = document.querySelector(".repositories");
const input = document.querySelector(".search__input");

// auth: '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'

const octokit = new Octokit({
  auth: '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',
});

input.addEventListener("keydown", (e) => {
  if (e.key != "Enter") return;
  let inputValue = e.target.value;
  if (inputValue) {
    getRepoFunc(inputValue);
  } else {
    createListRepo();
  }
});
async function getRepoFunc(inputValue) {
  let getRepo = await octokit.request(
    `GET /search/repositories?q=${inputValue}in:name`,
    {
      accept: "application/vnd.github.v3+json",
      per_page: 10,
    }
  );
  console.log(getRepo);
  let arrRepo = getRepo.data.items;
  createListRepo(arrRepo);
}

function createListRepo(arr = undefined) {
  repositories.innerHTML = "";

  !arr || arr.length == 0
    ? (repositories.innerHTML = `
    <div class="notFound">
      Ничего не найдено
    </div> 
  `)
    : arr.map((e) => {
        return (repositories.innerHTML += `
      <div class="repositories__item">
        <div class="item__nameRepo">
          Repo:
          <a target="_blank" href="${e.html_url}">${e.name}</a>
        </div>
        <div class="item__author">Author: ${e.owner.login}</div>
        <div class="item__lang">Language: ${
          e.language ? e.language : "Не указан"
        }</div>
      </div> 
  `);
      });
}
