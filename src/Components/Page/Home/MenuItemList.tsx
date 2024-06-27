import React, { useEffect, useState } from "react";
import { menuItem } from "../../../Types";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Store/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Store/Redux/store";
import { SD_Sort_Types } from "../../../Utulity/SD";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [sortName, setSortName] = useState(SD_Sort_Types.NAME_A_Z);
  const dispatch = useDispatch();
  const sortOptions: Array<SD_Sort_Types> = [
    SD_Sort_Types.NAME_A_Z,
    SD_Sort_Types.NAME_Z_A,
    SD_Sort_Types.PRICE_HIGH_LOW,
    SD_Sort_Types.PRICE_LOW_HIGH,
  ];

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItem) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setMenuItems(tempArray);
  };

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(sortName, localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (
    sortType: SD_Sort_Types,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: menuItem) =>
              item.category.toUpperCase() === category.toUpperCase()
          );

    //search functionality
    if (search) {
      const tempArray2 = [...tempArray];
      tempArray = tempArray2.filter((item: menuItem) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    //sort
    if (sortType === SD_Sort_Types.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItem, b: menuItem) => a.price - b.price);
    }
    if (sortType === SD_Sort_Types.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItem, b: menuItem) => b.price - a.price);
    }
    if (sortType === SD_Sort_Types.NAME_A_Z) {
      tempArray.sort(
        (a: menuItem, b: menuItem) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_Sort_Types.NAME_Z_A) {
      tempArray.sort(
        (a: menuItem, b: menuItem) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li
              className="nav-item"
              style={{ ...(index === 0 && { marginLeft: "auto" }) }}
              key={index}
            >
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="row">
        {menuItems.length > 0 &&
          menuItems.map((menuItem: menuItem, index: number) => (
            <MenuItemCard menuItem={menuItem} key={index} />
          ))}
      </div>
    </div>
  );
}

export default MenuItemList;
