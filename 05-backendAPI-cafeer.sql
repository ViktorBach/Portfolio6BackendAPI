CREATE TABLE cafes(
cafe_id INTEGER auto_increment primary key, 
cafe_name VARCHAR(100),
cafe_city VARCHAR(100)
); 

CREATE TABLE users(
user_id INTEGER auto_increment primary key,
user_firstname VARCHAR(50),
user_lastname VARCHAR(50),
user_email VARCHAR(50),
user_password VARCHAR(50)
);

CREATE TABLE favorites(
user_id INTEGER, 
cafe_id INTEGER,
foreign key (user_id) references users(user_id),
foreign key (cafe_id) references cafes(cafe_id)
); 

CREATE TABLE details(
cafe_id INTEGER, 
opening_hours VARCHAR(50),
address VARCHAR(100), 
price_range VARCHAR(5),
wifi VARCHAR(3),
info VARCHAR(500)
);


INSERT INTO cafes(cafe_name, cafe_city)
VALUES
	('Paludan Bog & Café', 'København'),
    ('Bevar’s', 'København'),
    ('Lagonis Kaffebar', 'København'),
    ('Rist', 'København'),
    ('Den Lille Smalle', 'Odense'),
    ('Kjærs Kaffebar', 'Århus'),
    ('Café Luna', 'Aalborg'),
    ('The Mokka Café', 'Kolding'),
    ('Miss Coffee', 'Helsingør'),
    ('Rømers Kaffebar', 'Hillerød'),
    ('Nr. 15', 'København'),
    ('Café Divino', 'Espergærde'),
    ('MØRK risteri & kaffebar', 'Roskilde'),
    ('BRØD', 'Svendborg'),
    ('RS28 Kaffebar', 'Århus');
    
SELECT * from cafes;
    
INSERT INTO users(user_firstname, user_lastname)
VALUES
    ('Christine', 'Tofft'),
    ('Lucas', 'Jacobsen'),
    ('Rasmus', 'Planteig'),
    ('Christian', 'Thellefsen'),
    ('Natazja', 'Rosenkjær'),
    ('Sofie', 'Thorlund');
    
SELECT * from users;
    
INSERT INTO favorites(user_id, cafe_id)
VALUES
	(1, 1),
    (2, 8),
    (3, 4),
    (4, 9),
    (5, 3),
    (6, 12);

SELECT * FROM favorites;

INSERT INTO details(cafe_id, opening_hours, address, price_range, wifi, info)
VALUES 
	(1, '10:00 - 17:00', 'Fiolstræde 12, København K', '$$', 'JA', 'Paludan Bogcafé er et strålende sted at starte eksamenslæsningen. Her er gratis wifi, udsøgt kaffe og ikke mindst en smuk indretning, hvor du har mulighed for at sidde blandt gamle bogreoler, der bidrager til en helt særlig stemning. 
Mange sidder her hele dagen, da der er studievenlige priser på både kaffe, mad og andre lækkerier.'),
    (2, '11:30 - 19:00', 'Ravnsborggade 10B, København N', '$', 'JA', 'Denne café ligger på Ravnsborggade på Nørrebro, og her er der lagt op til, at du benytter stedet som arbejdsrum i dagstimerne. Hvis du bliver hængende til aftentid, kan du opleve caféens aften set-up med mad, stearinlys, musik og fest.'),
    (3, '09:00 - 18:00', 'Ryesgade 76, København Ø', '$$$', 'JA', 'Her kan du nyde alt fra en frisk brygget kop kaffe eller nippe til et glas af din yndlingsvin, alt dette kan gøres imens du nyder en af deres lækre sandwiches eller kager.'),
    (4, '10:00 - 16:00', 'Værnedamsvej 4B, København V', '$', 'JA', 'Stedets interiør er rustikt med rå murstensvægge og en bar beklædt med træplanker i forskellige farver. Rist serverer god kaffe lavet af dygtige baristaer. Kaffebaren serverer desuden vin, juice, snaks og sandwiches.'),
    (5, '11:00 - 19:00', 'Vestergade 5, Odense', '$$', 'JA', 'Hyggelig lille café med forskellige morgenmads- og frokosttilbud. Både glutenfrie og laktosefrie muligheder. Der er masser af stikkontakter og muligheder for at sidde og arbejde eller studere.'),
    (6, '09:30 - 18:00', 'Sønder Allé 29, Aarhus', '$$$', 'JA', 'Super hyggelig kaffebar i hjertet af Aarhus. Friskbagte boller og kage hver dag. Mange tager det med på vejen, men der er også plads til at slå sig ned i og nyde et roligt og afslappende ophold i kaffebaren.'),
    (7, '12:00 - 20:00', 'Boulevarden 38, Aalborg', '$', 'NEJ', 'Café Luna har nogle hyggelige og indbydende lokaler med en fantastisk stemning. Her er der masser af plads til, at sidde med computeren og studere, enten alene eller med vennerne.'),
    (8, '08:00 - 19:00', 'AL Passagen 9, Kolding', '$', 'NEJ', 'Hyggelig café midt i Koldings gågade. Caféen er lille og intim men med plads til at sidde og nyde en kop kaffe med sin computer i ro.'),
    (9, '08:30 - 17:30', 'Stengade 17, Helsingør', '$$', 'JA', 'Caféen ligger på solsiden på Stengade, hvor solens stråler rammer fra tidlig morgen til sen eftermiddag. Deres enkle menukort er baseret på den gode smag med friske råvarer, som serveres til en pris, hvor alle kan være med.'),
    (10, '09:00 - 18.30', 'Slotsgade 10, Hillerød', '$', 'JA', 'I hjertet af Hillerøds gågade finder du Rømers Kaffebar, hvor der serveres økologisk og hjemmelavet morgenmad, frokost og tapas - alt sammen med verdens bedste kaffe. '),
    (11, '11:00 - 22:00', 'Holmbladsgade 15, København S', '$$$', 'JA', 'Hos Nr. 15 Køkken & Bar kan du nyde såvel en lækker brunch eller morgenmad som delikate frokostretter og et solidt aftensmåltid – selvfølgelig også i vegetariske versioner. Caféen har massere af plads med baglokaler som er mere lukkede for at arbejde eller studere i fred.'),
    (12, '10:00 - 19:00', 'Mørdrupvej 1A, Espergærde', '$$$', 'NEJ', 'Hos Café Divino kan du få lækker italiensk kaffe mens du nyder udsigten over Øresund. Der er massere af små borde hvor du kan sidde med en computer, både inde og ude.'),
    (13, '07:00 - 17:30', 'Penselsstrøget 44, Roskilde', '$$', 'JA', 'MØRK er et lokalt økologisk kafferisteri med fokus på kvalitet og bæredygtighed. Hvis man prioritere god kaffe, ville dette være den oplagte café for en studerende.'),
    (14, '10:00 - 19:00', 'Gerritsgade 18B, Svendborg', '$', 'JA', 'Friskbagte kager og boller med kvalitetskaffe ved siden af. De studievenlige priser gør dette til et populært sted for studerende.'),
    (15, '10:00 - 18:00', 'Ryesgade 28, Aarhus', '$', 'JA', 'RS28 er en moderne kaffebar i Århus. Priserne gør caféen til et populært samlested for de mange studerende i Århus.');

SELECT * FROM details;




