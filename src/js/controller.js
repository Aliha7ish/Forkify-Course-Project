import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// import Fraction from './fractional';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.loadingSpinner();
    // resultsView.loadingSpinner();

    //Loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // controlServings();
  } catch (err) {
    recipeView.renderError(err);
    console.log(err);
  }
}

const controlSearchResults = async function () {
  try {
    const searchResult = searchView.searchInputResult();
    if (!searchResult) return;
    await model.loadSearchResults(searchResult);
    searchView.clearInput();
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update servings
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  bookmarksView.render(model.state.bookmarks);
  // if(model.state.recipe.bookmarked)

  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    //Rendering recipe
    recipeView.render(model.state.recipe);

    //adding to bookmarks
    bookmarksView.render(model.state.recipe);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //closing form window
    setTimeout(addRecipeView.toggleWindow(), 2500);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

const init = function () {
  bookmarksView.adddHandler(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerResult(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerBookmarks(controlAddBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

//Linear search

// const linearSearch = function (arr, el) {
//   arr.forEach((i, index) => {
//     if (el === i) {
//       console.log(index);
//       return;
//     }
//   });
//   return -1;
// };
// // linearSearch([1,2,5,3,4,7,8,9], 9);

// const binarySearch = function (arr, el) {
//   let low = 0;
//   let high = arr.length - 1;
//   for (let i = 0; i < arr.length; i++) {
//     let mid = (low + high) / 2;
//     if (el === arr[mid]) {
//       console.log(mid);
//       return;
//     }
//     if (el > arr[mid]) {
//       low = mid + 1;
//     } else high = mid - 1;
//   }
// };

// binarySearch([5, 7, 8, 9, 10, 12, 14, 15, 17, 18], 10);

// const swap = function (arr, i, j) {
//   let temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// };

// const selectionSort = function (arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     let min = arr[i];
//     let indexOfMin = i;
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j] < min) {
//         min = arr[j];
//         indexOfMin = j;
//       }
//     }
//     swap(arr, i, indexOfMin);
//   }
// };

// console.log(selectionSort([2, 4, 78, 10, 1, 25, 40]));
