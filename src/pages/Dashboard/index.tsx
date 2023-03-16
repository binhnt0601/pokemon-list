
import { useEffect, useMemo, useState } from "react";
import { Divider } from "../../components/Atoms/Divider";
import { Loading } from "../../components/Atoms/Loading";
import { Card } from "../../components/Molecules/Card";
import { Pagination } from "../../components/Molecules/Pagination";
import { Col, Row } from "../../components/Organisms/Grid";
import AxiosInstance from "../../services/axios";
import { ListResponse, Pokemon } from "../../services/pokemon/types";
import { BasePageProps } from "../../utils/component";
import Select from 'react-select';
import axios from "axios";

type Option = {
    value: number;
    label: string;
}

const options: Array<Option> = [
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 500, label: '500' },
  ]

const IndexPage: React.FC<BasePageProps> = () => {
    const [data, setData] = useState<Array<Pokemon>>([]);
    const [types, setTypes] = useState<Array<Pokemon>>([]);
    const [pokemonsDetail, setPokemons] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string | null> (null);
    const [activeById, setActiveById] = useState<number>(-1);
    const [arrayUrl, setArrayUrl] = useState<string[]>([]);

    const [limit, setLimit] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getList = async() => {
        try {
            const res = await AxiosInstance.get(`pokemon?limit=1200`);
            if(res) {
                setData(res?.data?.results);
            }
        } catch (err) {
            alert(err);
        }
    }

    const getTypes = async() => {
        try {
            const res = await AxiosInstance.get('type');
            if(res) {
                setTypes(res?.data?.results);
            }
        } catch (err) {
            alert(err);
        }
    }

    const getDetail = async () => {
        try {
            let apiArray = [];
            setLoading(true);
            for (let i = 0; i < arrayUrl.length; i++) {
                apiArray.push(AxiosInstance.get(arrayUrl[i]));
            }
            const res = await axios.all(apiArray);
            setPokemons(res.map(i => i.data));
            setLoading(false);
        } catch (err) {
            alert(err);
        }
    }

    const getFilterData = async () => {
        setLoading(true);
        let apiArray = [];
        // const currentIndex = (currentPage*limit) - limit;
        // for (let i = currentIndex === 0 ? 1 : currentIndex; i < currentPage*limit; i++) {
        apiArray.push(AxiosInstance.get(String(filter)));
        // }
        const res = await axios.all(apiArray);
        setData(res.map(i => i?.data?.pokemon?.map((i: { pokemon: Pokemon; }) => i.pokemon))[0]);
        setLoading(false);
    }

    useEffect(() => {
        if (filter) getFilterData();	
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const onSelectType = (item: Pokemon, index: number) => {
        setFilter(item.url);
        setActiveById(index);
    }

    const goToPage = (page: number) => {
        setCurrentPage(page);
    }

    const onSelectChange = (option: any) => {
        setLimit((option as Option).value);
        setCurrentPage(1);
    }

    const dataTest = useMemo(() => {
        const cloneData = [...data];
        const dataFilter = cloneData.filter((_, index) => {
            return (currentPage - 1) * limit <= index && index <= (currentPage * limit)-1;
        })
        setArrayUrl(dataFilter.map(i => i.url));
        return dataFilter;
    }, [currentPage, data, limit]);
    
    const pageCount = Math.ceil(data.length / limit);

    useEffect(()=>{
        if (arrayUrl.length > 0) getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrayUrl]);

    useEffect(() => {
        getList();
        getTypes();	
    }, []);

    return (
        <div style={{margin: 20}}>
            <Row>
                <Row>
                    <Col xs={1}>Types:</Col>
                    <Col xs={11}>
                    {types?.map((item, index) => 
                        <button 
                            key={`type-${index.toString()}`} 
                            type="button"
                            className={`btn btn-outline-danger ${activeById === index ? 'active' : ''}`}
                            style={{ margin: '0 10px 15px' }}
                            onClick={() => onSelectType(item, index)}
                        >
                            {item.name}
                        </button>
                    )}
                    </Col>
                </Row>
                {dataTest && dataTest?.map((item, index) => {
                    return (
                        <Col
                            key={`${item?.name}-${index.toString()}`}
                            lg='2'
                            md="3"
                            xs="4"
                            className="d-flex justify-content-center align-items-center justify-content-md-start mb-2 mt-2"
                        >
                            {pokemonsDetail[index]?.sprites &&
                                <Card 
                                    isLoading={loading}
                                    title={item?.name} 
                                    src={pokemonsDetail[index]?.sprites?.other['official-artwork']?.front_default} 
                                />
                            }
                        </Col>
                    )
                })}
            </Row>
            <div className="mt-2 mb-2">
                <Divider />
            </div>
            <div className="d-flex justify-content-center">
                <Select options={options} onChange={onSelectChange} defaultValue={options.find(i => i.value === limit)} />
                <Pagination
                    pageCount={pageCount}
                    onPageChange={goToPage}
                />
            </div>
        </div>
)};

export default IndexPage;
