import TextButton from '../components/buttons/text_button';
import BrandList from '../components/filter/brand_list';
import PriceRangeFilter from '../components/filter/price_range_filter';
import SortOptions from '../components/sort_options';
import VehicleList from '../components/vehicle_list';

export const Home = () => {
    const brands = [
        { id: 1, brand: "Audi" },
        { id: 2, brand: "BMW" },
        { id: 3, brand: "Citroen" },
        { id: 4, brand: "Ford" },
        { id: 5, brand: "Merc" },
        { id: 6, brand: "Opel" },
    ];

    const vehicles = [
        { id: 47, brand: "Opel", model: "Mokka", year: 2024, price: 21183, fuel_type: 1, doors: 5, description: "BMW serija 5 Touring: siva barva", image_url: "https://images.avto.net/photo/20094420/1063315_HD.jpg" },
        { id: 46, brand: "Audi", model: "Drugi", year: 2023, price: 20183, fuel_type: 1, doors: 5, description: "Vozilo prihaja iz nemškega trga in je v odličnem stanju. Vsi servisi so opravljeni na pooblaščenem servisu BMW. Vsa zgodovina znana. Vozilo z bogato opremo in atraktivnega izgleda.", image_url: "https://images.avto.net/photo/20076004/1081055_HD.jpg" },
        { id: 45, brand: "BMW", model: "Tretji", year: 2022, price: 11183, fuel_type: 1, doors: 5, description: "Stanje: servina knjiga / potrjena vozilo ni bilo karambolirano vozilo je bilo garažirano 1. lastnik", image_url: "https://images.avto.net/photo/20088110/2044684_HD.jpg" },
        { id: 44, brand: "Citroen", model: "Cetrti turbo diesel", year: 2014, price: 10183, fuel_type: 1, doors: 5, description: "• parkirni senzorji zadaj• parkirna kamera• ambientalna osvetlitev• samozatemnitveno vzvratno ogledalo• samodejni vklop žarometov v predoru• multimedijski sistem z zaslonom na dotik (DAB, Apple CarPlay, Android Auto, Bluetooth)• 17-palčna ALU platišča • tempomat• sistem samodejnega zaviranja za preprečevanje trka pri manjši hitrosti• samodejna klimatska naprava• naslon za roko spredaj• elektronska ročna zavora", image_url: "https://images.avto.net/photo/20065035/1048202.jpg" },
        { id: 43, brand: "Seat", model: "Ka te vem keri tip", year: 2004, price: 2183, fuel_type: 1, doors: 5, description: "MOŽNOST PLAČILO NA OBROKE LEANPAY HITRI KREDIT CITROEN C3 1.2 BENCINSKI MOTOR SLOVESNKO POREKLO Zelo lepo ohranjen ter redno servisiran.", image_url: "https://images.avto.net/photo/19331166/1044554.jpg" },
    ];

    function submitFilterHandler() {
        console.log("Filter clicked")
    }

    return (
        <div className='container'>
            <div className='filter-area'>
                <BrandList brands={brands} />
                <PriceRangeFilter />
                <TextButton label="Filter" onClick={submitFilterHandler} />
            </div>
            <div className='middle-area'>
                <VehicleList vehicles={vehicles} />
            </div>
            <div className='sort-area'>
                <SortOptions />
            </div>
        </div>
    );
}