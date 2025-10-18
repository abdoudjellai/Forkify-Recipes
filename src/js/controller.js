import * as model from './model.js'
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResulstView from './views/resultsView.js'
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';

// if(module.hot){
//   module.hot.accept()
// }

const controlRecipe = async function () {
  // LOAD RECIPE FROM API 
  try {
    const recipeID = window.location.hash.slice(1) ;
    
    
    if(! recipeID) return  
    recipeView.renderSpinner() ;
    
    
    // loading recipe 
    await model.loadRecipe(recipeID) ;
    
    // RENDER RECIPE TO THE PAGE 
    recipeView.render(model.state.recipe) ;
    
    resultsView.update(model.getSearchResultPage())

    bookmarksView.update(model.state.bookmarks)

  } catch(err) {
    console.log(err)
    recipeView.showError();
  }
  
}

const  controlSearchResults =async function() {
    try {
      
      //get search query
      const query =  SearchView.getQuery()
      if( !query ) return ;
      ResulstView.renderSpinner()

      // await search result
      await  model.loadSearchResult(query) ; 

     // RENDER RECIPE TO THE PAGE 
      resultsView.render(model.getSearchResultPage()) ;

      console.log(model.state.search.result)
      // render initial pagination buttons
      paginationView.render(model.state.search)

    } catch (err) {
      resultsView.showError()
    }
} ; 

const controlPagination = function(goToPage) {

  resultsView.render(model.getSearchResultPage(goToPage)) ;
      
  // render initial pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = function(servings) {

  // Update the recipe servings (in state)
  model.updateServings(servings)
  // Update the recipe view 
  recipeView.update(model.state.recipe) ;
    
}

const controlAddBookmark = function()  {

  if(!model.state.recipe.bookmarked ){
    model.addBookMark(model.state.recipe)
    
  }
  else
    model.deleteBookmark(model.state.recipe.id)
  
    recipeView.update(model.state.recipe)
      
    bookmarksView.render(model.state.bookmarks)
    
}
const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}
const controlAddRecipe = async function(newRecipe) {
  
  try {
    addRecipeView.renderSpinner()
    //uploaf the new recipe data 
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe);
    
    //render recipe 
    recipeView.render(model.state.recipe)

    
    //show message 
    addRecipeView.showMessage()

    //render bookmarks view
    bookmarksView.render(model.state.bookmarks)

    //change ID in the url 
    window.history.pushState(null , '' , `#${model.state.recipe.id}`)

    //close form window 
    setTimeout(function () {
      addRecipeView.toggleWindow() 
      
    },MODAL_CLOSE_SEC * 1000)
  }catch(err) {
    addRecipeView.showError(err.message)
  }

}
const init =  function() {
  addRecipeView.addHnadlerUpload(controlAddRecipe)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookMark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination) ; 
  bookmarksView.addHandlerrestoreBookmarks(controlBookmarks)
  SearchView.addHandlerSearch(controlSearchResults ); 
  console.log('hello');
}
init() ;  



