
import { useEffect, useState } from "react";
import { Divider } from "../../components/Atoms/Divider";
import { Loading } from "../../components/Atoms/Loading";
import { Card } from "../../components/Molecules/Card";
import { Pagination } from "../../components/Molecules/Pagination";
import { Col, Row } from "../../components/Organisms/Grid";
import AxiosInstance from "../../services/axios";
import { ListResponse, Pokemon } from "../../services/pokemon/types";
import { BasePageProps } from "../../utils/component";
import Select from 'react-select';

type Option = {
    value: number;
    label: string;
}

const options: Array<Option> = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ]

const IndexPage: React.FC<BasePageProps> = () => {

    const [data, setData] = useState<ListResponse | null>(null);
    const [pokemonsDetail, setPokemons] = useState<any[]>([]);
    const [types, setTypes] = useState<Array<Pokemon>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(10);

    // const {
	// 	result: listPokemon,
	// 	request: getList,
	// } = useMakeRequest<ListResponse, GetListPayload>({
	// 	requestInstance: createHTTP({
    //         baseURL: `${process.env.REACT_APP_API_BASE_URL}/pokemon`,
    //     }),
	// });

    const getList = async() => {
        try {
            const res = await AxiosInstance.get(`pokemon?limit=${limit}`);
            if(res) {
                setData(res?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getTypes = async() => {
        try {
            const res = await AxiosInstance.get('type');
            if(res) {
                setTypes(res?.data?.results);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getDetail = async () => {
        let pokemons = [];
        const currentIndex = (currentPage*limit) - limit;
        setLoading(true);
        for (let i = currentIndex === 0 ? 1 : currentIndex; i < currentPage*limit; i++) {
            const res = await AxiosInstance.get(`pokemon/${i}`);
            pokemons.push(res?.data);
        }
        setPokemons(pokemons);
        setLoading(false);
    }

    const goToPage = (page: number) => {
        setCurrentPage(page);
    }

    const onSelectChange = (option: any) => {
        setLimit((option as Option).value);
        setCurrentPage(1);
    }
    
    const pageCount = Number(1000) / Number(data?.results?.length || 0);

    useEffect(() => {
        getTypes();	
    }, []);

    useEffect(()=>{
        getList();
        getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, currentPage]);

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
                            className="btn btn-outline-danger"
                            style={{ margin: '0 10px 15px' }}
                        >
                            {item.name}
                        </button>
                    )}
                    </Col>
                </Row>
                {data?.results && data?.results?.map((item, index) => {
                    return (
                        <Col
                            key={`${item?.name}-${index.toString()}`}
                            lg='1'
                            md="2"
                            xs="3"
                            className="d-flex justify-content-center align-items-center justify-content-md-start mb-2 mt-2"
                        >
                            {pokemonsDetail[index]?.sprites && !loading ? 
                                <Card 
                                    title={item?.name} 
                                    src={pokemonsDetail[index]?.sprites?.other['official-artwork']?.front_default} 
                                />
                                : <Loading />
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
