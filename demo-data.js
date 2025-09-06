// Demo data for Nijmegen March Training Tracker
// Run this in the browser console to add sample achievements

const demoAchievements = [
    {
        id: "demo1",
        duration: 3,
        weight: 0,
        speedTarget: 6.5,
        actualSpeed: 6.7,
        date: "2024-01-15",
        status: "success",
        comment: "Great weather, felt strong throughout / Hyvä sää, tuntui vahvalta koko matkan",
        userId: "demo",
        userName: "Demo User"
    },
    {
        id: "demo2",
        duration: 3,
        weight: 5,
        speedTarget: 6.0,
        actualSpeed: 5.8,
        date: "2024-01-18",
        status: "failed",
        comment: "Started too fast, ran out of energy in the last hour / Aloitin liian nopeasti, energia loppui viimeisessä tunnissa",
        userId: "demo",
        userName: "Demo User"
    },
    {
        id: "demo3",
        duration: 3,
        weight: 10,
        speedTarget: 5.7,
        actualSpeed: 5.9,
        date: "2024-01-22",
        status: "success",
        comment: "Much better pacing this time / Paljon parempi tahti tällä kertaa",
        userId: "demo",
        userName: "Demo User"
    },
    {
        id: "demo4",
        duration: 8,
        weight: 0,
        speedTarget: 5.5,
        actualSpeed: 5.6,
        date: "2024-01-25",
        status: "success",
        comment: "First 8-hour march! Legs were tired but managed to finish strong / Ensimmäinen 8 tunnin marssi! Jalat olivat väsyneet mutta onnistuin päättämään vahvasti",
        userId: "demo",
        userName: "Demo User"
    },
    {
        id: "demo5",
        duration: 3,
        weight: 15,
        speedTarget: 5.4,
        actualSpeed: 5.2,
        date: "2024-01-28",
        status: "failed",
        comment: "Heavy pack was challenging, need more practice with this weight / Raskas reppu oli haastava, tarvitsen enemmän harjoittelua tällä painolla",
        userId: "demo",
        userName: "Demo User"
    },
    {
        id: "demo6",
        duration: 8,
        weight: 5,
        speedTarget: 5.0,
        actualSpeed: 5.1,
        date: "2024-02-01",
        status: "success",
        comment: "Excellent endurance training, felt comfortable throughout / Erinomainen kestävyysharjoitus, tuntui mukavalta koko matkan",
        userId: "demo",
        userName: "Demo User"
    }
];

// Function to load demo data
function loadDemoData() {
    const existingData = JSON.parse(localStorage.getItem('nijmegenAchievements') || '[]');
    const demoData = [...existingData, ...demoAchievements];
    localStorage.setItem('nijmegenAchievements', JSON.stringify(demoData));
    console.log('Demo data loaded! Refresh the page to see the achievements.');
}

// Instructions for use:
console.log('To load demo data, run: loadDemoData()');
console.log('This will add sample achievements to your training tracker.');
