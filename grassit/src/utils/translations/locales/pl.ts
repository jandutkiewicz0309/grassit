/**
 * Source dictionary. Every other locale is a translation of this file and must
 * keep the exact same key structure - `Dictionary` in `../index.ts` is derived
 * from it, so a missing key is a compile error.
 *
 * Interpolation uses `{{ name }}` placeholders resolved by `resolveTemplate`.
 */
export const pl = {
  lang: {
    label: "Język",
    pl: "Polski",
    en: "English",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
  },

  common: {
    brand: "Grassit",
    contactUs: "Skontaktuj się",
    seeProducts: "Zobacz produkty",
    sendInquiry: "Wyślij zapytanie",
    back: "Wróć",
    available: "Dostępne",
    close: "Zamknij",
  },

  nav: {
    home: "Strona główna",
    products: "Produkty",
    services: "Usługi",
    projects: "Realizacje",
    contact: "Kontakt",
    about: "O nas",
    delivery: "Dostawa",
    installation: "Montaż",
    consulting: "Doradztwo",
    decorative: "Trawy Dekoracyjne",
    sport: "Trawy sportowe",
    accessories: "Akcesoria",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
  },

  hero: {
    eyebrow: "Produkt ekologiczny",
    title: "Zielony trawnik przez cały rok",
    lead: "Odmień swoją przestrzeń dzięki najwyższej jakości trawie syntetycznej. Idealna do stadionów, ogrodów, przestrzeni komercyjnych i publicznych. Profesjonalny montaż, trwałość na lata.",
    uspsLabel: "Korzyści",
    usp1: "oszczędność wody",
    usp2: "Odporna na UV, bezpieczna dla zwierząt",
    usp3: "Nie wymaga pielęgnacji",
    altShape: "Kształt dekoracyjny",
    altWaterDrop: "Kropla wody",
    altScissors: "Nożyczki",
  },

  categories: {
    heading: "Wybierz odpowiedni rodzaj trawy do swoich potrzeb",
    lead: "Wybierz typ trawy dopasowany do przestrzeni: ogród, krajobraz, sport, lub dobierz akcesoria do montażu.",
    cardAria: "{{ title }} – {{ desc }}. Zobacz produkty.",
    decorativeTitle: "Trawy Dekoracyjne",
    decorativeDesc:
      "Gęste, dekoracyjne trawniki dla twojego ogrodu i innych powierzchni zewnętrznych",
    sportTitle: "Trawy sportowe",
    sportDesc: "Najwyższej jakości murawy sportowe do tenisa, piłki nożnej i padla.",
    accessoriesTitle: "Akcesoria",
    accessoriesDesc: "Narzędzia montażowe i inne.",
  },

  why: {
    heading: "Zalety trawnika syntetycznego",
    naturalTitle: "Naturalny wygląd",
    naturalDesc:
      "Nasze produkty stworzone są aby skutecznie imitować żywy, idealnie utrzymany trawnik. Niektóre modele posiadają do 14 różnych odcieni koloru zielonego na 10 cm²",
    petsTitle: "Produkt przyjazny zwierzętom",
    petsDesc:
      "Trawniki w naszej ofercie posiadają drenaż który skutecznie odprowadza wodę oraz mocz zwierząt nie pozostawiając plam.",
    freshTitle: "Zawsze świeży wygląd",
    freshDesc:
      "Skuteczna odporność na promienie UV sprawi, że kolor twojego trawnika będzie zawsze świeży i mocno nasycony",
    maintenanceTitle: "Produkt bezobsługowy",
    maintenanceDesc:
      "Koniec z nawożeniem, podlewaniem i koszeniem swojego trawnika. Nasze produkty są produktami bezobsługowymi. Sugerujemy jednak regularne czesanie trawnika aby zachować źdźbła trawy w pionie.",
  },

  sustainability: {
    imgAlt: "Sztuczna trawa inspirowana naturą",
    title: "Produkt przyjazny środowisku",
    lead: "Nasza trawa ogranicza zużycie wody i spływ chemikaliów, pozostając miękka i bezpieczna dla dzieci oraz zwierząt.",
    toxinsTitle: "Brak toksycznych materiałów",
    toxinsDesc:
      "produkt spełnia rygorystyczne normy bezpieczeństwa dla przestrzeni mieszkalnych i komercyjnych",
    waterTitle: "Oszczędność wody",
    waterDesc:
      "produkt nie wymaga podlewania, a jego specjalny drenaż odprowadza wodę do ziemi bez zostawiania kałuży i efektu „mokrej wykładziny”",
    recyclingTitle: "Produkt podlega recyklingowi",
    recyclingDesc:
      "podłoże w większości produktów nadaje się do recyklingu, przez co utylizacja trawnika nie wpływa negatywnie na środowisko",
    badgeDelivery: "Szybka dostawa",
    badgeWarranty: "Gwarancja do 12 lat",
  },

  faq: {
    heading: "Często zadawane pytania",
    q1: "Jak wygląda pielęgnacja sztucznej trawy?",
    a1: "Wystarczy okresowe wyczesanie, usunięcie liści i przepłukanie wodą. W strefach intensywnych można dodać wypełnienie i podnieść włókna szczotką.",
    q2: "Co z odprowadzaniem wody podczas deszczu?",
    a2: "Podłoże jest perforowane, dzięki czemu woda szybko przesiąka do warstwy drenażowej. Przy właściwie przygotowanej podsypce nie tworzą się zastoiska.",
    q3: "Jak długo może służyć sztuczna trawa?",
    a3: "Żywotność zależy od klasy produktu i intensywności użytkowania. Dobre trawy ogrodowe zachowują estetykę nawet 10–15 lat; w miejscach mocno eksploatowanych okres ten bywa krótszy.",
    q4: "Czy sztuczna trawa jest bezpieczna dla dzieci i zwierząt?",
    a4: "Tak. Produkty są wolne od ołowiu i toksyn, a miękkie włókna minimalizują ryzyko otarć. Zalecamy regularne płukanie w strefach zabawy.",
  },

  footer: {
    tagline: "Rozwiązanie idealne do domu, przestrzeni komercyjnych i obiektów sportowych.",
    socialLabel: "Media społecznościowe",
    colProducts: "Produkty",
    colInfo: "Informacje",
    colServices: "Usługi",
    colContact: "Kontakt",
    country: "Polska",
    regon: "REGON",
    vatId: "NIP",
    copyright: "© {{ year }} Grassit. Wszelkie prawa zastrzeżone.",
  },

  impressum: {
    title: "Dane rejestrowe",
    contact: "Kontakt",
    phone: "Telefon",
    email: "E-mail",
    web: "Strona internetowa",
    representation: "Reprezentacja - Zarząd",
    president: "Prezes Zarządu",
    boardMember: "Członek Zarządu",
    representationNote:
      "Każdy członek zarządu jest uprawniony do samodzielnej reprezentacji spółki.",
    registry: "Wpis do rejestru",
    registryNote:
      "Spółka wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego (KRS).",
    court: "Sąd rejestrowy",
    capital: "Kapitał zakładowy",
  },

  topInfo: {
    hours: "pon-pt 9:00-19:00 / sob 10:00-14:00",
  },

  products: {
    heading: "Nasze produkty",
    lead: "Odkryj nasz katalog trawników oraz akcesoriów do sztucznej trawy.",
    searchPlaceholder: "Wyszukaj produkt...",
    results: "{{ count }} wyników",
    empty: "Brak produktów spełniających kryteria.",
  },

  filter: {
    title: "Filtry",
    clear: "Wyczyść",
    categories: "Kategorie",
    price: "Cena ({{ unit }})",
    min: "Min",
    max: "Max",
    catDecorative: "Dekoracyjne",
    catSport: "Sportowe",
    catAccessories: "Akcesoria",
    subFootball: "Piłka Nożna",
    subPadel: "Padel",
    subGolf: "Golf",
    subTennis: "Tenis",
  },

  product: {
    headerTitle: "Szczegóły produktu",
    headerLead: "Specyfikacja, parametry techniczne i kluczowe informacje.",
    priceOnRequest: "Wycena indywidualna",
    netPerSqm: "netto / m²",
    perSqm: "/ m²",
    color: "Kolor",
    details: "Szczegóły",
    specification: "Specyfikacja",
    producer: "Producent",
    height: "Wysokość",
    weight: "Waga",
    material: "Materiał",
    uvResistant: "Odporność na UV",
    yes: "Tak",
    no: "Nie",
    orderSample: "Zamów DARMOWĄ próbkę",
    downloadCard: "Pobierz kartę techniczną",
    similar: "Podobne produkty",
    galleryMain: "Zdjęcie produktu",
    galleryThumbs: "Dodatkowe zdjęcia",
    badgeBestseller: "BEST SELLER",
    colorGreen: "Zielony",
    colorBlue: "Niebieski",
  },

  sample: {
    heading: "Poproś o próbkę",
    lead: "Proszę wypełnić poniższy formularz, a przedstawiciel handlowy skontaktuje się z Państwem, aby pomóc w rozpoczęciu projektu. Można również skontaktować się z naszymi licznymi przedstawicielami.",
    detailsTitle: "Szczegóły",
    price: "Cena",
    productId: "ID Produktu",
  },

  form: {
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    phone: "Telefon",
    phoneLong: "Numer telefonu",
    question: "Pytanie",
    street: "Ulica i numer mieszkania",
    zip: "Kod pocztowy",
    city: "Miasto",
    company: "Firma (opcjonalnie)",
    vatId: "NIP (opcjonalnie)",
    notes: "Uwagi / preferencje",
    required: "*",
    phFirstName: "Wprowadź swoje imię",
    phLastName: "Wprowadź swoje nazwisko",
    phEmail: "Wprowadź swój adres email",
    phPhone: "Wprowadź swój numer telefonu",
    phMessage: "Twoja wiadomość...",
    phStreet: "Wprowadź ulicę i numer domu/mieszkania",
    phZip: "Wprowadź kod pocztowy",
    phCity: "Wprowadź miasto",
    phCompany: "Wprowadź nazwę firmy do wysyłki",
    phVatId: "Wprowadź numer NIP do faktury",
    phNotes: "Dodatkowe uwagi do wysyłki…",
    legal:
      "Administratorem danych osobowych jest GRASSIT Sp. z o.o. z siedzibą w Myślenicach (32-400), ul. Kazimierza Wielkiego 47. Dane osobowe podane w formularzu kontaktowym przetwarzane są w celu obsługi zapytania przesłanego za pomocą formularza oraz podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy – na podstawie art. 6 ust. 1 lit. b Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. Dane mogą być również przetwarzane w celu kontaktu handlowego – na podstawie prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO). Podanie danych jest dobrowolne, jednak niezbędne do realizacji zapytania. Dane osobowe będą przechowywane przez okres niezbędny do obsługi zapytania, a w przypadku zawarcia umowy – przez okres jej realizacji oraz po jej zakończeniu przez czas wymagany przepisami prawa. Przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu, przenoszenia danych oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.",
  },

  errors: {
    minChars: "Podaj przynajmniej 2 znaki",
    firstNameLetters: "Imię może zawierać tylko litery",
    lastNameLetters: "Nazwisko może zawierać tylko litery",
    lettersOnly: "Tylko litery",
    email: "Podaj poprawny adres e-mail",
    phone: "Podaj poprawny numer telefonu",
    messageShort: "Wiadomość jest zbyt krótka",
    street: "Podaj ulicę i numer",
    city: "Podaj miasto",
    zipFormat: "Format {{ example }}",
    vatInvalid: "Nieprawidłowy NIP",
  },

  contactPage: {
    title: "Skontaktuj się",
    text: "Uzupełnij formularz kontaktowy a nasz pracownik skontaktuje się z Tobą najszybciej jak to możliwe. Jeżeli potrzebujesz pilnej informacji, zapraszamy do kontaktu telefonicznego pod numerem {{ phone }}.",
  },

  about: {
    title: "O Grassit",
    imgAlt: "Sztuczna trawa - główne zdjęcie",
    logoAlt: "Grassit logo",
    p1: "Jesteśmy firmą specjalizującą się w sprzedaży oraz profesjonalnej instalacji wysokiej jakości sztucznej trawy. Od lat pomagamy naszym klientom tworzyć estetyczne, funkcjonalne i trwałe przestrzenie zielone — bez konieczności czasochłonnej pielęgnacji.",
    p2: "Nasza oferta obejmuje nowoczesne rozwiązania, które doskonale sprawdzają się w ogrodach, na tarasach i balkonach, placach zabaw, boiskach sportowych, a także w przestrzeniach komercyjnych. Współpracujemy wyłącznie z renomowanymi producentami, dzięki czemu oferowana przez nas sztuczna trawa wiernie odwzorowuje naturalną murawę, jest odporna na warunki atmosferyczne i bezpieczna w użytkowaniu.",
    p3: "Każdy projekt traktujemy indywidualnie. Zapewniamy fachowe doradztwo na każdym etapie realizacji — od wyboru odpowiedniego produktu, przez przygotowanie podłoża, aż po precyzyjny montaż. Nasz doświadczony zespół dba o detale, terminowość oraz najwyższą jakość wykonania.",
    p4: "Stawiamy na rzetelność, nowoczesne technologie i zadowolenie klientów. Dzięki naszym realizacjom możesz cieszyć się idealnie zieloną powierzchnią przez cały rok — bez koszenia, podlewania i nawożenia.",
    p5: "Zapraszamy do współpracy i kontaktu — chętnie pomożemy stworzyć przestrzeń dopasowaną do Twoich potrzeb.",
    formTitle: "Zrób pierwszy krok do pięknego ogrodu – napisz do nas.",
    formText:
      "Skontaktuj się z naszym zespołem i dowiedz się, jak możemy pomóc Ci zaplanować i zrealizować Twój projekt.",
  },

  installation: {
    imgAlt: "Montaż sztucznej trawy",
    title: "Montaż trawy syntetycznej",
    lead: "Zajmujemy się kompleksowym montażem i sprzedażą sztucznej trawy na terenie całej Polski. Realizujemy projekty zarówno dla klientów indywidualnych, jak i firm, od małych ogrodów, przez tarasy, po rozległe tereny rekreacyjne i komercyjne. W zależności od zastosowania oferujemy trawy o różnej wysokości włókna, gęstości i sprężystości, dobrane tak, by zachować idealny wygląd i trwałość przez wiele lat.",
    intro: "W ramach usługi zapewniamy:",
    item1: "przygotowanie i wyrównanie podłoża,",
    item2: "dostawę trawy oraz materiałów montażowych,",
    item3: "wykonanie niezbędnych docięć i łączeń,",
    item4: "wypełnienie piaskiem kwarcowym (jeśli wymagane),",
    item5: "uporządkowanie terenu po zakończeniu prac.",
    note: "Cena usługi zależy od wielkości projektu, stopnia skomplikowania, rodzaju podłoża oraz użytych materiałów. Wszystkie wyceny przygotowujemy indywidualnie.",
  },

  consulting: {
    imgAlt: "Doradztwo przy wyborze trawy",
    title: "Doradztwo",
    lead: "Dobór odpowiedniej sztucznej trawy wymaga uwzględnienia kilku czynników — rodzaju powierzchni, intensywności użytkowania i oczekiwanego efektu wizualnego. Oferujemy profesjonalne doradztwo techniczne i estetyczne, dzięki któremu otrzymasz rozwiązanie idealnie dopasowane do Twojego projektu.",
    helpTitle: "W czym pomagamy:",
    item1: "dobór trawy o właściwej strukturze, kolorze i wysokości włókna,",
    item2: "ocena warunków technicznych podłoża,",
    item3: "określenie potrzeb w zakresie podbudowy i drenażu,",
    item4: "kalkulacja ilości materiału i kosztów montażu.",
    processTitle: "Jak wygląda doradztwo:",
    processText:
      "Po krótkiej rozmowie lub wymianie wiadomości analizujemy Twoje potrzeby i warunki techniczne terenu. Na tej podstawie proponujemy konkretne modele trawy, sposób montażu oraz orientacyjny koszt.",
  },

  delivery: {
    imgAlt: "Dostawa sztucznej trawy",
    title: "Dostawa",
    lead: "Zapewniamy szybki i bezpieczny transport sztucznej trawy na terenie całego kraju. Każda rolka jest odpowiednio zabezpieczana, aby dotarła do klienta w nienaruszonym stanie, niezależnie od odległości.",
    stepsTitle: "Jak przebiega dostawa:",
    step1Title: "Zamówienie i potwierdzenie terminu",
    step1Text: "ustalamy rodzaj trawy, metraż i adres dostawy.",
    step2Title: "Przygotowanie materiału",
    step2Text: "trawa jest przycinana i zwijana w rolki o dogodnej długości.",
    step3Title: "Transport i dostarczenie",
    step3Text: "realizujemy przewóz własnym transportem lub zaufanymi firmami kurierskimi.",
    note: "Dostarczamy trawę zarówno w ramach kompleksowych realizacji montażowych, jak i przy samodzielnych zakupach.",
  },

  notFound: {
    title: "Nie znaleziono",
    heading: "Przepraszamy",
    description: "Strona jest jeszcze nie dostępna, pracujemy nad jej dodaniem.",
    productHeading: "Nie znaleziono produktu",
  },

  toast: {
    sending: "Wysyłanie wiadomości...",
    success: "Dziękujemy! Formularz został wysłany.",
    successProduct: "Dziękujemy! Wysłaliśmy zapytanie o produkt.",
    error: "Nie udało się wysłać formularza. Spróbuj ponownie.",
    subject: "Wiadomość ze strony",
  },

  geo: {
    message: "Wygląda na to, że jesteś w kraju: {{ country }}.",
    goTo: "Przejdź na {{ host }}",
    stay: "Zostań tutaj",
    dismiss: "Zamknij",
    PL: "Polska",
    DE: "Niemcy",
    CH: "Szwajcaria",
  },

  seo: {
    titleSuffix: "Grassit",
    homeTitle: "Grassit - Sztuczna trawa premium",
    homeDescription:
      "Sztuczna trawa najwyższej jakości do ogrodów, obiektów sportowych i przestrzeni komercyjnych. Profesjonalny montaż i gwarancja trwałości.",
    productsTitle: "Produkty - Grassit",
    productsDescription:
      "Odkryj nasz katalog traw syntetycznych – trawy dekoracyjne, sportowe i akcesoria. Sprawdź ceny i zamów darmową próbkę.",
    aboutTitle: "O nas - Grassit",
    aboutDescription:
      "Poznaj Grassit – producenta sztucznej trawy premium. Nasza historia, wartości i misja.",
    contactTitle: "Kontakt - Grassit",
    contactDescription:
      "Skontaktuj się z nami – doradztwo, wycena i zamówienia sztucznej trawy Grassit.",
    installationTitle: "Montaż trawy syntetycznej - Grassit",
    installationDescription:
      "Profesjonalny montaż sztucznej trawy – przygotowanie podłoża, układanie i wykończenie.",
    consultingTitle: "Doradztwo - Grassit",
    consultingDescription:
      "Bezpłatne doradztwo przy wyborze sztucznej trawy do Twojego projektu.",
    deliveryTitle: "Dostawa - Grassit",
    deliveryDescription:
      "Szybka i bezpieczna dostawa sztucznej trawy Grassit na terenie całej Polski.",
    productTitle: "{{ name }} - Grassit",
    orderSampleTitle: "Zamów próbkę {{ name }} - Grassit",
    orderSampleDescription: "Zamów darmową próbkę {{ name }} od Grassit.",
  },
};

export type Dictionary = typeof pl;
