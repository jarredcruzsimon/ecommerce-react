import './Catergories-Container.styles.scss'
import categoriesList from './category-list';
import CategoryItem from '../Category-Item/category-item.component';

const CategoriesContainer =()=> {

    return (
      <div className="categories-container">
        {categoriesList.map((category)=>(
          <CategoryItem key={category.id} category={category}/>
      ))}
      </div>
    );
  }
  
  export default CategoriesContainer;