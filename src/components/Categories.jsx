import React from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect } from "react";

const Categories = () => {
  const [{ token, categories }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/browse/categories`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const categories = response.data.categories.items;
      console.log(categories);
      dispatch({ type: reducerCases.SET_CATEGORIES, categories });  
    };
    getCategories();
  }, [token, dispatch]);

  return (
    <Container>
      <div>
        {categories.map((category) => {
          return (
            <div>
              <h2>{category.name}</h2>
              <img key={category.id} src={category.icons[0].url} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  svg {
    color: yellowgreen;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2.5rem;
  }
`;
