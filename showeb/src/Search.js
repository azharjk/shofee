import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

import { chunkArray } from './utils';
import Recommended from "./Recommended";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productChunk, setProductChunk] = useState([]);
  const query = searchParams.get('q') || '';

  const getQueryResult = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/products/search?q=${query}`);
      setProductChunk(chunkArray(response.data));
    } catch (e) {
      console.log('ERROR: getQueryResult');
      console.error(e);
    }
  }

  useEffect(() => {
    getQueryResult();
  }, []);

  return <Recommended productChunk={productChunk} title={`Hasil dari \`${query}\``} />
}

export default Search;
