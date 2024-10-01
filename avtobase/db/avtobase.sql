-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table avtobase.fuel_types: ~3 rows (approximately)
INSERT INTO `fuel_types` (`id`, `type`) VALUES
	(1, 'petrol'),
	(2, 'diesel'),
	(3, 'electric');

-- Dumping data for table avtobase.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `name`, `surname`, `username`, `role`, `email`, `password`, `token`) VALUES
	(1, 'Alen', 'Cvahte', 'cheese', 1, 'a.cvahte@gmail.com', 'alen123', NULL),
	(2, 'Test', 'Testni', 'test_user', 0, 'test@test.com', 'test123', NULL);

-- Dumping data for table avtobase.vehicles: ~40 rows (approximately)
INSERT INTO `vehicles` (`id`, `brand`, `model`, `year`, `price`, `fuel_type`, `doors`, `description`, `image_url`) VALUES
	(1, 1, 'A6', 2019, 32990, 2, 4, 'Audi A6 40 TDI S tronic S line |VIRTUAL|BLIS|KAMERA|SLO|', 'https://images.avto.net/photo/20094420/1063315_HD.jpg'),
	(19, 1, 'A6', 2019, 46000, 2, 5, '2. lastnik, vozilo uvozeno z nemcije zgodovina znana. Redno servisirano (narejen tudi servis menjalnika, menjano olje v diferencialih, vtg)… prva barva brez praske.', 'https://images.avto.net/photo/20073505/1032088.jpg'),
	(20, 1, 'A3', 2015, 13900, 2, 5, 'Prodam zelo ohranjen avto z veliko opreme. Zraven podarim še štiri dodatne alu platišča za zimske gume. V sep.2024 narejen tudi redni servis na 150.000 Km. Avto vreden nakupa. Menjave niso možne.Cena po dogovoru.', 'https://images.avto.net/photo/20073432/1044584.jpg'),
	(21, 1, 'RS7', 2015, 67500, 1, 5, 'NEMŠKO POREKLO REDNO SERVISIRAN STAGE 2 CUSTOM DOWNPIPI možna menjava za dražje vozilo ali plovilo.', 'https://images.avto.net/photo/19452054/1059180.jpg'),
	(22, 1, 'A1', 2019, 15970, 1, 5, 'Audi A1 25 TFSI+Advanced+1.LASTNIK+SLO.POREKLO', 'https://images.avto.net/photo/20093680/1054222_HD.jpg'),
	(23, 2, '320d', 2022, 39980, 2, 4, 'Vozilo prihaja iz nemškega trga in je v odličnem stanju. Vsi servisi so opravljeni na pooblaščenem servisu BMW. Vsa zgodovina znana. Vozilo z bogato opremo in atraktivnega izgleda.', 'https://images.avto.net/photo/20087868/1042651_HD.jpg'),
	(24, 2, 'X5', 2019, 59950, 2, 5, 'BMW serija X5: xDrive30d Avt M PAKET+F1+PANO+LASER+MAXTON+ALU22', 'https://images.avto.net/photo/20091436/1031494.jpg'),
	(25, 2, '5 Touring', 2008, 2500, 2, 5, 'BMW serija 5 Touring: siva barva', 'https://images.avto.net/photo/20086162/6081179.jpg'),
	(27, 2, '218i', 2023, 31370, 1, 5, 'TEHNIČNE SPECIFIKACIJE VOZILA\r\nMoč motorja - 100 kW (136 hp)\r\nPospešek od 0 do 100 km/h - 9 s \r\nCO2 emisije (WLTP) - 141 g/km\r\nPoraba goriva (WLTP) -  6,3 l/100 km\r\nDelovna prostornina 1.499 cm³\r\nŠt. Cilindrov 3\r\nDolžina 4.386 mm \r\nTeža z voznikom 1.545 kg\r\nNavor 230 Nm\r\nNajvišja hitrost 214 km/h\r\nProstornina rezervoarja 54 l', 'https://images.avto.net/photo/20077783/1044491_HD.jpg'),
	(28, 3, 'C3', 2017, 8600, 1, 5, 'MOŽNOST PLAČILO NA OBROKE LEANPAY HITRI KREDIT\r\n\r\nCITROEN C3 1.2 BENCINSKI MOTOR\r\n\r\nSLOVESNKO POREKLO\r\n\r\nZelo lepo ohranjen ter redno servisiran.', 'https://images.avto.net/photo/20085592/1069166.jpg'),
	(29, 3, 'Berlingo', 2024, 32020, 2, 5, 'Stanje:\r\nservisna knjiga\r\nvozilo ni bilo karambolirano\r\nslovensko poreklo\r\nnavodila za uporabo v SLO jeziku\r\nvozilo je novo', 'https://images.avto.net/photo/20067679/6031133_HD.jpg'),
	(30, 3, 'XM', 1998, 3600, 2, 5, 'ZELO LEPO OHRANJEN, VSE DELUJE.', 'https://images.avto.net/photo/18754834/1022957.jpg'),
	(32, 4, 'Fiesta ST', 2019, 19900, 1, 5, 'Najboljši paket opreme ST3\r\n\r\nVozilo je v originalnem stanju. Vrhunsko ohranjeno.\r\nVozilo se oglašuje za sorodnika iz Zagreba. Ogled vozila je po predhodni najavi v Zagrebu.', 'https://images.avto.net/photo/20087492/1040184.jpg'),
	(33, 4, 'Focus', 2015, 6500, 1, 5, '1. lastnik, odlično ohranjen, garažiran.\r\n\r\nVsako leto servisiran pri pooblaščenem serviserju, na zadnjem velikem servisu (april 2024) je bil zamenjan tudi jermen.\r\n\r\nLetne pneumatike (Michelin) so bile kupljene aprila 2021, zimske pneumatike (Bridgestone), kupljene oktobra 2020, podarim. Oboje so v dobrem stanju.', 'https://images.avto.net/photo/20085439/1044491.jpg'),
	(34, 4, 'S-MAX', 2019, 23599, 2, 5, 'Stanje:\r\nservisna knjiga / potrjena\r\nvozilo ni bilo karambolirano\r\nvozilo je bilo garažirano\r\n1. lastnik', 'https://images.avto.net/photo/20055272/5030444_HD.jpg'),
	(35, 4, 'F-150', 2019, 61900, 1, 4, 'Avto se nahaja v Sloveniji, mesto Kranj. Prosim ne menjave, samo prodaja.\r\n\r\nDas Auto ist in einwandfreiem Zustand. Mein persönliches Auto, viele Zusatzoptionen und Zubehör. Satz Winterräder. Mit Sitz in Slowenien kann die Inspektion nach vorheriger Absprache in Klagenfurt, Villah, Ljubljana, Kranj durchgeführt werden.', 'https://images.avto.net/photo/19942265/1074256.jpg'),
	(37, 5, 'E350d', 2017, 26999, 2, 5, 'Opombe:\r\n1.lastnik\r\nRedno servisirano vozilo\r\nOpravljen redni servis\r\nRealni kilometri\r\n2x kljuc\r\nOdličen', 'https://images.avto.net/photo/20076748/1035418_HD.jpg'),
	(39, 5, 'GLE 350d', 2021, 69990, 2, 5, '-AMG LINE\r\n-1 LASTNIK\r\n-SEDEŽEV 5+2\r\n-PREVOŽENO SAMO 78000 KM\r\n-REDNO SEVISIRAN SAMO NA ORIGINALU', 'https://images.avto.net/photo/20076004/1081055_HD.jpg'),
	(40, 5, 'C 220t', 2019, 17900, 2, 5, 'avto je zelo dobro ohranjeno, redno servisirano na Mercedes servisu (razvidno v servisni knjigi)\r\nZadnji servis julij 2024.\r\nZraven dam še komplet zimske gume na alu platiščih, stare eno senzono.', 'https://images.avto.net/photo/20058211/1056709.jpg'),
	(42, 5, 'A 180', 2014, 15200, 1, 5, 'Malo rabljene zimske gume Michelin Alpin 6 in letne Michelin Primacy 4 dimenzij 205/55/R16', 'https://images.avto.net/photo/19996723/1053682.jpg'),
	(43, 5, 'Vito 119', 2016, 18000, 2, 4, 'kupljen v Sloveniji, 1. lastnik, 140 kW / 190 KM, pogon 4x4, električna drsna vrata, vlečna kljuka, zatemnjena stekla, garažiran, redno servisiran, 3 nerabljeni sedeži.\r\nJanuarja 2024 opravljen servis (menjava vseh filtrov, menjava olja, novi zavorni diski, nove zavorne obloge,', 'https://images.avto.net/photo/19331166/1044554.jpg'),
	(44, 6, 'Astra', 2008, 2200, 1, 4, 'Avto je v dokaj dobrem stanju, kar je vidno na slikah. Brez večjih poškodb in redno vzdrževan. Tehnični pregled velja do avgusta 2025. Odličen za vsakodnevno vožnjo, udoben in varčen. Za vse dodatne informacije ali dogovor o ogledu vozila me lahko pokličete na telefonsko številko', 'https://images.avto.net/photo/20081721/1047353.jpg'),
	(45, 6, 'Insignia', 2013, 4240, 2, 5, 'Notranjost Opel ADAM 150.\r\nVozilo redno servisirano.\r\nZraven dodan zimske gume letnik 2023.', 'https://images.avto.net/photo/20078507/1053246.jpg'),
	(46, 6, 'Corsa', 2015, 5800, 1, 5, 'Prodamo odlično ohranjeno vozilo. Vreden ogleda.\r\n\r\nLokacija okolica Šentjurja.', 'https://images.avto.net/photo/19866089/1037402.jpg'),
	(47, 6, 'Mokka', 2024, 21183, 1, 0, '• parkirni senzorji zadaj\r\n• parkirna kamera\r\n• ambientalna osvetlitev\r\n• samozatemnitveno vzvratno ogledalo\r\n• samodejni vklop žarometov v predoru\r\n• multimedijski sistem z zaslonom na dotik (DAB, Apple CarPlay, Android Auto, Bluetooth)\r\n• 17-palčna ALU platišča \r\n• tempomat\r\n• sistem samodejnega zaviranja za preprečevanje trka pri manjši hitrosti\r\n• samodejna klimatska naprava\r\n• naslon za roko spredaj\r\n• elektronska ročna zavora', 'https://images.avto.net/photo/20094657/1066628.jpg'),
	(48, 7, '2008 ', 2024, 29020, 1, 5, 'OPCIJSKA OPREMA:\r\nPeugeot e-Call.\r\nNavigacija.\r\nKamera spredaj.\r\nNadzor mrtvega kota.\r\n18" ALU platišča.\r\nKomplet za popravilo pnevmatik.\r\nSamodejni tempomat.\r\nAktivni sistem s funkcijo vožnje po voznem pasu.', 'https://images.avto.net/photo/20088110/2044684_HD.jpg'),
	(49, 7, '508', 2020, 17290, 2, 5, 'Podvozje:\r\nlahka - ALU platišča\r\nABS zavorni sistem\r\nBAS pomoč pri zaviranju\r\nsamodejna zapora diferenciala (ASD / EDS ...)\r\nESP elektronski program stabilnosti\r\nASR regulacija zdrsa pogonskih koles', 'https://images.avto.net/photo/20081616/1045251.jpg'),
	(50, 7, '3008', 2018, 16400, 2, 5, '- 2.LASTNIK,\r\n- SLOVENSKO POREKLO,\r\n- POTRJENA SERVISNA KNJIGA NA URADNEM PEUGEOT SERVISU,\r\n- VOZILO JE MEHANSKO BREZHIBNO IN VRHUNSKO OHRANJENO.\r\n- VSI REDNI SERVISI OPRAVLJENI NA POBLASCENEM URADNEM SERVISU,OPRAVLJEN MALI SERVIS(naftni,oljni,zracni,kabinski filter ter olje).\r\n- NA 135 000 JE OPRAVLJEN GLAVNI SERVIS.', 'https://images.avto.net/photo/20075010/1061146.jpg'),
	(51, 8, 'Captur', 2024, 18690, 1, 5, 'DODATNE OPCIJE NA VOZILU:\r\nZasilno rezervno kolo \r\ndvobarvna karoserija\r\nZunanja ogledala v barvi strehe\r\nCena velja v primeru Renault financiranja- doplačilo priprava vozila.', 'https://images.avto.net/photo/20065541/1050632.jpg'),
	(52, 8, 'Clio', 2008, 2090, 1, 5, 'Narejen mali servis\r\nZamenjani spodnji lezaji in amortizerji\r\nTehnicni na novo\r\nVeliki servis narejen na 180000km\r\nKomplet zimskih in letnih gum\r\nAvto je mehansko brezhiben\r\nKaroserija brez rje\r\nAvto za svoja leta lepo ohranjen', 'https://images.avto.net/photo/20094629/1066476.jpg'),
	(53, 8, 'Megane RS', 2015, 19490, 1, 3, 'Prodajam Renault Megane RS letnik 2015.\r\nFacelift model z Bluetooth, Navigacijo, Novejšimi lučmi, Novejšo notranjostjo.\r\n\r\nORIGINAL 43.299km\r\n\r\nAvto je zelo lepo ohranjen, redno in pravilno servisiran vsakih 7000km. Uporabljen kot 2. avto.\r\n\r\nAvto ima vso opremo, ima lepo ohranjeno notranjost in je brez poškodb zunaj.', 'https://images.avto.net/photo/20059796/1045397.jpg'),
	(54, 9, 'Octavia RS', 2024, 41750, 1, 5, 'DODATNA OPREMA NA VOZILU:\r\n-Akustični paket s Sunset\r\n-aluminijasta platišča "ELIAS"\r\n-dinamično uravnavanje podvozja DCC \r\n-Kamere Area View\r\n-Slog notranjosti RS SUEDIA ', 'https://images.avto.net/photo/20094637/1067416.jpg'),
	(55, 9, 'Kodiaq', 2019, 20999, 2, 5, 'PRODAMO ODLIČNO OHRANJENO ŠKODO KODIAQ 2.0 TDI 4X4 DSK 150 DSG Z DODATNO OPREMO REDNO SERVISIRANO. PRAVKAR OPRAVLJEN ZADNJI SERVIS PRI 152.662 KM DNE 09.07.2024 (SERVIS NA MOTORJU + VSI FILTRI, SERVIS NA DSG MENJALNIKI + FILTER, SERVIS NA HALDEX SKLOPKI ŠTIRIKOLESNEGA POGONA, ZAMENJANI ZAVORNI DISKI IN ZAVORNE OBLOGE SPREDAJ).', 'https://images.avto.net/photo/19973643/1078316.jpg'),
	(56, 9, 'Octavia', 2016, 6990, 2, 5, 'Avto se prodaja zgolj zaradi potrebe po pick-up vozilu. Avto je redno servisiran, redno menjani vsi deli, ki spadajo pod potrošni material. Notranjost ohranjena kot nova.', 'https://images.avto.net/photo/20072525/3038242.jpg'),
	(57, 9, 'Superb', 2012, 9300, 2, 5, 'Prodajam Škoda Superb Combi 2.0 TDI Automatic Karavan\r\n\r\nZakaj izbrati to vozilo?\r\n\r\nKljub letniku 2012 je to eno redkih vozil, ki je še vedno vzdrževano po navodilih in priporočilih proizvajalca. Škoda Superb Combi 2.0 TDI DSG je zanesljivo, prostorno in ekonomično vozilo, primerno tako za družinska potovanja, kot poslovne poti.', 'https://images.avto.net/photo/20071466/1079519.jpg'),
	(58, 10, 'Tiguan', 2019, 29980, 2, 5, 'PRAVKAR OPRAVLJEN REDNI SERVIS - ZAMENJANO OLJE V MOTORJU + VSI FILTRI\r\n\r\nZNANA VSA ZGODOVINA SERVISIRANJA - VSI SERVISI SLEDLJIVI\r\nPRILOŽEN DIGITALNI IZPIS SERVISNE ZGODOVINE\r\n\r\nDODATEN KOMPLET ALU PLATIŠČ Z ZIMSKIMI GUMAMI', 'https://images.avto.net/photo/19988563/1050888_HD.jpg'),
	(59, 10, 'Passat', 2018, 17990, 2, 5, 'VOZILO Z GARANCIJO\r\nVSA VOZILA IMAJO GARANCIJO OD 1 MESECA DO 12 MESECEV\r\nMOŽNOST PREGLEDA VOZILA NA POOBLAŠČENEM SERVISU\r\nMOŽNOST MENJAVE - RABLJENO ZA RABLJENO\r\nMOŽNOST UGODNEGA FINANCIRANJA BREZ POLOGA\r\nLEASING\r\nZA POLOG VZAMEMO TUDI VAŠ STARI AVTO\r\nODKUP VAŠEGA VOZILA\r\nPOPLAČILO LEASINGA NA VAŠEM VOZILU\r\nDOSEGLJIVI VSAK DAN OD 7.00h DO 20.00 NA 051 416 703', 'https://images.avto.net/photo/20091579/1032123.jpg'),
	(60, 10, 'Tiguan', 2010, 6999, 1, 5, 'Podvozje:\r\nlahka - ALU platišča:jeklena\r\nABS zavorni sistem\r\nBAS pomoč pri zaviranju\r\nESP elektronski program stabilnosti\r\nASR regulacija zdrsa pogonskih koles', 'https://images.avto.net/photo/20090898/1079381.jpg'),
	(61, 10, 'Golf Plus', 2011, 4999, 2, 5, 'Vozilo je zelo lepo ohranjeno in redno servisirano.. Pred kratkim opravljen redni servis. Varčen motor 2,0 TDI EURO6.  Zelo veliko dodatne opreme in atraktivnega videza: gretje sedežev, tempomat, ,multifunkcijski volan, športni  volan,  tonirana stekla, avt.  klima  digitalna , alu platišča, PDC  spredaj in zadaj, , športni sedeži...  Odlične vozne lastnosti tudi v zimskih razmerah.  Po dogovoru možnost enoletnega jamstva na vozilo. Možna menjava za cenejše vozilo. Vozilo vredno ogleda in nakupa.', 'https://images.avto.net/photo/20092184/1039334.jpg'),
	(62, 10, 'Sharan', 2016, 20500, 2, 5, '• 1. LASTNIK\r\n• VOZILO REDNO SERVISIRANO\r\n• ZNANA ZGODOVINA\r\n• PRILOŽENA ZGODOVINA SERVISIRANJA\r\n• OPRAVLJEN GLAVNI SERVIS\r\n• ODLIČEN Z ZELO BOGATO DODATNO OPREMO\r\n• GRETEJE SEDEŽEV\r\n• MULTIFUNKCIJSKI USNJEN VOLAN\r\n• XENON ŽAROMETI\r\n• PARKIRNI SENZORJI SPREDAJ IN ZADAJ\r\n• TONIRANA STEKLA\r\n• POTOVALNI RAČUNALNIK\r\n• 2 CONSKA KLIMA\r\n• VLEČNA KLJUKA', 'https://images.avto.net/photo/20065035/1048202.jpg');

-- Dumping data for table avtobase.vehicle_brand: ~10 rows (approximately)
INSERT INTO `vehicle_brand` (`id`, `name`) VALUES
	(1, 'Audi'),
	(2, 'BMW'),
	(3, 'Citroen'),
	(4, 'Ford'),
	(5, 'Mercedes-Benz'),
	(6, 'Opel'),
	(7, 'Peugeot'),
	(8, 'Renault'),
	(9, 'Skoda'),
	(10, 'Volkswagen');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
