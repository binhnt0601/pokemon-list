import { useEffect, useState } from 'react';
import { Divider } from '../../components/Atoms/Divider';
import { Card } from '../../components/Molecules/Card';
import { Pagination } from '../../components/Molecules/Pagination';
import { Col, Row } from '../../components/Organisms/Grid';
import AxiosInstance from '../../services/axios';
import { Pokemon } from '../../services/pokemon/types';
import { BasePageProps } from '../../utils/component';
import Select from 'react-select';
import axios from 'axios';

type Option = {
  value: number;
  label: string;
};

const options: Array<Option> = [
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 500, label: '500' },
];

const IndexPage: React.FC<BasePageProps> = () => {
  const [data, setData] = useState<Array<Pokemon>>([]);
  const [types, setTypes] = useState<Array<Pokemon>>([]);
  const [filters, setFilters] = useState<Array<Pokemon>>([]);
  const [activeByIds, setActiveByIds] = useState<Array<number>>([]);
  const [pokemonsDetail, setPokemonsDetail] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getList = async (isType?: boolean) => {
    try {
      const res = await AxiosInstance.get(isType ? 'type' : 'pokemon?limit=1281');
      if (res) {
        isType ? setTypes(res?.data?.results) : setData(res?.data?.results);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getDetail = async () => {
    try {
      let apiArray = [];
      setLoading(true);
      const urls = data
        .map(i => i.url)
        .filter((_, index) => {
          return (currentPage - 1) * limit <= index && index <= currentPage * limit - 1;
        });
      for (let i = 0; i < urls.length; i++) {
        apiArray.push(AxiosInstance.get(urls[i]));
      }
      const res = await axios.all(apiArray);
      setPokemonsDetail(res.map(i => i.data));
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const getFilterData = async () => {
    setLoading(true);
    let apiArray = [];
    for (let i = 0; i < filters.length; i++) {
      apiArray.push(AxiosInstance.get(filters[i]?.url));
    }
    const res = await axios.all(apiArray);
    const newDataAfterMap = res
      .map(i => i?.data?.pokemon?.map((i: { pokemon: Pokemon }) => i.pokemon))
      .reduce((acc, val) => {
        return [...acc, ...val];
      });
    setData(newDataAfterMap);
    setLoading(false);
  };

  useEffect(() => {
    if (filters.length > 0) getFilterData();
    else {
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const onSelectType = (item: Pokemon, index: number) => {
    setFilters(prev => (filters.includes(item) ? filters.filter(i => i !== item) : [...prev, item]));
    setActiveByIds(prev => (activeByIds.includes(index) ? activeByIds.filter(i => i !== index) : [...prev, index]));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const onSelectChange = (option: any) => {
    setLimit((option as Option).value);
    setCurrentPage(1);
  };

  const pageCount = Math.ceil(data.length / limit);

  useEffect(() => {
    if (data.length > 0) getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, data, limit, filters]);

  useEffect(() => {
    getList();
    getList(true);
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <Row>
        <Col xs={1}>Types:</Col>
        <Col xs={11}>
          {types?.map((item, index) => (
            <button
              key={`type-${index.toString()}`}
              type="button"
              className={`btn btn-outline-danger ${activeByIds.includes(index) ? 'active' : ''}`}
              style={{ margin: '0 10px 15px' }}
              onClick={() => onSelectType(item, index)}
            >
              {item.name}
            </button>
          ))}
        </Col>
      </Row>

      {data.length > 0 ? (
        <>
          <h4>
            Current page ({currentPage}) has <span className="text-success">{pokemonsDetail.length} </span>
            {pokemonsDetail.length === 1 ? 'result' : 'results'} found.
          </h4>
          <h4>
            All pages have <span className="text-success">{data.length} </span>
            {pokemonsDetail.length === 1 ? 'result' : 'results'} found.
          </h4>

          <Row>
            {pokemonsDetail &&
              pokemonsDetail?.map((item, index) => {
                return (
                  <Col
                    key={`${item?.name}-${index.toString()}`}
                    lg="2"
                    md="3"
                    xs="4"
                    className="d-flex justify-content-center align-items-center justify-content-md-start mb-2 mt-2"
                  >
                    {pokemonsDetail[index]?.sprites && (
                      <Card
                        isLoading={loading}
                        title={pokemonsDetail[index]?.name}
                        src={pokemonsDetail[index]?.sprites?.other['official-artwork']?.front_default}
                      />
                    )}
                  </Col>
                );
              })}
          </Row>
          <div className="mt-2 mb-2">
            <Divider />
          </div>
          <div className="d-flex justify-content-center">
            <Select options={options} onChange={onSelectChange} defaultValue={options.find(i => i.value === limit)} />
            <Pagination defaultCurrentPage={currentPage} pageCount={pageCount} onPageChange={goToPage} />
          </div>
        </>
      ) : (
        <h2 className="text-center">No results found.</h2>
      )}
    </div>
  );
};

export default IndexPage;
