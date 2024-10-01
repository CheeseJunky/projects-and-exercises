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
        {id: 47, brand: "Opel", model: "Mokka", year: 2024, price: 21183, fuel_type: 1, doors: 5, description: "• parkirni senzorji zadaj• parkirna kamera• ambientalna osvetlitev• samozatemnitveno vzvratno ogledalo• samodejni vklop žarometov v predoru• multimedijski sistem z zaslonom na dotik (DAB, Apple CarPlay, Android Auto, Bluetooth)• 17-palčna ALU platišča • tempomat• sistem samodejnega zaviranja za preprečevanje trka pri manjši hitrosti• samodejna klimatska naprava• naslon za roko spredaj• elektronska ročna zavora", image_url: ""},
        {id: 46, brand: "Opel", model: "Drugi", year: 2024, price: 21183, fuel_type: 1, doors: 5, description: "• parkirni senzorji zadaj• parkirna kamera• ambientalna osvetlitev• samozatemnitveno vzvratno ogledalo• samodejni vklop žarometov v predoru• multimedijski sistem z zaslonom na dotik (DAB, Apple CarPlay, Android Auto, Bluetooth)• 17-palčna ALU platišča • tempomat• sistem samodejnega zaviranja za preprečevanje trka pri manjši hitrosti• samodejna klimatska naprava• naslon za roko spredaj• elektronska ročna zavora", image_url: ""},
        {id: 45, brand: "Opel", model: "Tretji", year: 2024, price: 21183, fuel_type: 1, doors: 5, description: "• parkirni senzorji zadaj• parkirna kamera• ambientalna osvetlitev• samozatemnitveno vzvratno ogledalo• samodejni vklop žarometov v predoru• multimedijski sistem z zaslonom na dotik (DAB, Apple CarPlay, Android Auto, Bluetooth)• 17-palčna ALU platišča • tempomat• sistem samodejnega zaviranja za preprečevanje trka pri manjši hitrosti• samodejna klimatska naprava• naslon za roko spredaj• elektronska ročna zavora", image_url: ""},
    ];

    function submitFilterHandler () {
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