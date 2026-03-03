// --- THE THRONE QUIZ LOGIC (FINAL BOSS VERSION) ---
const questions = [
    { 
        q: "What is the Targaryen Motto?", 
        a: ["Fire & Blood", "Winter is Coming", "Family First"], 
        correct: "Fire & Blood" 
    },
    { 
        q: "Which dragon was ridden by Aegon the Conqueror?", 
        a: ["Vhagar", "Balerion", "Caraxes"], 
        correct: "Balerion" 
    },
    { 
        q: "What metal is used to make the Iron Throne?", 
        a: ["Steel", "Valyrian Steel", "Swords of Fallen Foes"], 
        correct: "Swords of Fallen Foes" 
    },
    { 
        q: "Who is the 'King Who Knelt'?", 
        a: ["Torrhen Stark", "Viserys I", "Daemon Targaryen"], 
        correct: "Torrhen Stark" 
    },
    { 
        q: "What is dragonfire called in High Valyrian?", 
        a: ["Dracarys", "Dohaeris", "Valahd"], 
        correct: "Dracarys" 
    }
];

let currentIdx = 0;
let score = 0;

function startThroneQuiz() {
    currentIdx = 0; 
    score = 0;
    
    // UI Reset
    document.getElementById('quiz-overlay').style.display = 'flex';
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('result-screen').style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    const q = questions[currentIdx];
    document.getElementById('question-text').innerText = q.q;
    
    const btnContainer = document.getElementById('answer-buttons');
    btnContainer.innerHTML = ''; 

    q.a.forEach((optionText) => {
        const btn = document.createElement('button');
        btn.innerText = optionText; 
        btn.className = 'answer-btn';
        
        // Jab user click karega
        btn.onclick = function() {
            checkAnswer(optionText); 
        };
        
        btnContainer.appendChild(btn);
    });
}

function checkAnswer(userChoice) {
    const correctChoice = questions[currentIdx].correct;
    

    if(userChoice === correctChoice) {
        score++;
        console.log("Correct! Score is now: " + score);
    } else {
        console.log("Wrong! User chose: " + userChoice + " | Correct was: " + correctChoice);
    }
    
    currentIdx++;
    
    if(currentIdx < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


function showResult() {

    document.getElementById('quiz-content').style.display = 'none';
    const resultScreen = document.getElementById('result-screen');
    const header = document.getElementById('result-header');
    const msg = document.getElementById('result-message');
    const quizBox = document.getElementById('quiz-box');
    
    const actionButtons = document.querySelector('.result-actions');

    resultScreen.style.display = 'block';


    if (score === 5) {
        // --- VICTORY SIDE ---
        header.innerHTML = "LONG LIVE THE KING";
        header.style.color = "#ffd700"; 
        header.style.fontSize = "3rem";
        msg.innerHTML = "The Iron Throne is yours. All 5 trials passed.";
        quizBox.style.borderColor = "#ffd700";

        actionButtons.innerHTML = `
            <button onclick="closeQuiz()" class="claim-btn victory-btn">
                CLAIM THE THRONE
            </button>
        `;
    } else {
        // --- FAILURE SIDE ---
        header.innerHTML = "DRACARYS";
        header.style.color = "#ffffff"; 
        header.style.fontSize = "3rem";
        msg.innerHTML = `You scored ${score}/5. The dragons have spoken.`;
        quizBox.style.borderColor = "#444";

        actionButtons.innerHTML = `
            <button onclick="restartQuiz()" class="claim-btn">TRY AGAIN</button>
            <button onclick="closeQuiz()" class="claim-btn">ABANDON</button>
        `;
    }
}
// --- NEW ADDITIONS: EXIT & RESTART LOGIC ---

function closeQuiz() {
    const overlay = document.getElementById('quiz-overlay');
    if(overlay) {
        overlay.style.display = 'none';
    }
    
    currentIdx = 0;
    score = 0;
}

function restartQuiz() {
    startThroneQuiz();
}

window.onclick = function(event) {
    const overlay = document.getElementById('quiz-overlay');
    if (event.target == overlay) {
        closeQuiz();
    }
}

// THE HOUSE SECTION NAVBAR SWITCH TEAM LOGIC 
function filterTeam(team) {
    const cards = document.querySelectorAll('.char-card');
    const title = document.getElementById('house-title');
    
    // Title Change Logic
    if(team === 'black') {
        title.innerText = "THE BLACK COUNCIL";
        title.style.color = "#ff4d4d";
    } else if(team === 'green') {
        title.innerText = "THE GREEN COUNCIL";
        title.style.color = "#2ecc71";
    } else {
        title.innerText = "THE ROYAL DYNASTY";
        title.style.color = "#ffd700";
    }

    cards.forEach(card => {
        const cardTeam = card.getAttribute('data-team');
        if (team === 'all' || cardTeam === team || cardTeam === 'neutral') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
function toggleIntel(button) {

    const allPanels = document.querySelectorAll('.intel-panel');
    const allButtons = document.querySelectorAll('.intel-trigger');
    
    const currentPanel = button.nextElementSibling;

    allPanels.forEach((panel, index) => {
        if (panel !== currentPanel && panel.classList.contains('open')) {
            panel.classList.remove('open');
            allButtons[index].innerHTML = 'ACCESS INTEL <i class="fas fa-microchip"></i>';
        }
    });

    currentPanel.classList.toggle('open');

    if (currentPanel.classList.contains('open')) {
        button.innerHTML = 'CLOSE INTEL <i class="fas fa-times"></i>';
    } else {
        button.innerHTML = 'ACCESS INTEL <i class="fas fa-microchip"></i>';
    }
}
function filterTeam(team) {
    document.body.classList.remove('team-black-theme', 'team-green-theme');

    if (team === 'black') {
        document.body.classList.add('team-black-theme');
    } else if (team === 'green') {
        document.body.classList.add('team-green-theme');
    }

    const cards = document.querySelectorAll('.char-card');
    cards.forEach(card => {
        const cardTeam = card.getAttribute('data-team');
        if (team === 'all' || cardTeam === team || cardTeam === 'neutral') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
// DRAGON PAGE CONCEPT
function findMyDragon() {
    const month = document.getElementById("birth-month").value;
    const overlay = document.getElementById("claim-overlay");
    const displayArea = document.getElementById("card-display-area");
    const nameDisplay = document.getElementById("matched-dragon-name");
    const sysMsg = document.querySelector(".sys-msg");

    if (month === "") {
        alert("Your bloodline is unknown. Select a month!");
        return;
    }

    const dragonMap = {
        "0": "CARAXES", "1": "VHAGAR", "2": "SYRAX", "3": "VERMITHOR",
        "4": "MELEYS", "5": "SUNFYRE", "6": "SEASMOKE", "7": "DREAMFYRE",
        "8": "TESSARION", "9": "MOONDANCER", "10": "SILVERWING", "11": "ARRAX"
    };

    const dragonName = dragonMap[month];

    overlay.style.display = "flex";
    displayArea.innerHTML = ""; 
    nameDisplay.innerText = "";
    sysMsg.innerText = "ANALYZING TARGARYEN LINEAGE...";
    sysMsg.style.color = "#ffd700";

    setTimeout(() => {
        sysMsg.innerText = "THE DRAGON HAS CHOSEN YOU:";
        sysMsg.style.color = "white";
        nameDisplay.innerText = dragonName;

    
        const allCards = document.querySelectorAll('.dragon-card-horizontal');
        let matchedHTML = "";

        allCards.forEach(card => {
            if (card.querySelector('.dragon-name-glow').innerText.trim() === dragonName) {
                matchedHTML = card.outerHTML; 
            }
        });

        if (matchedHTML !== "") {
            displayArea.innerHTML = matchedHTML;

            const clonedCard = displayArea.querySelector('.dragon-card-horizontal');
            clonedCard.style.maxWidth = "700px";
            clonedCard.style.margin = "20px auto";
            clonedCard.style.border = "2px solid #ff4500"; 
            clonedCard.style.boxShadow = "0 0 60px rgba(15, 6, 3, 0.26)";
            
            clonedCard.style.transform = "none";
        } else {
            console.error("Card not found for: " + dragonName);
        }

    }, 2000);
}

function closeClaim() {
    document.getElementById("claim-overlay").style.display = "none";
}
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

const interactiveElements = document.querySelectorAll('button, a, .dragon-card-horizontal, select');

interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
    });
});
// HISTORY PAGE 


const eventLore = {
    "era-doom": [
        "**THE CATACLYSM:** The Fourteen Flames—a massive chain of volcanoes—erupted simultaneously, shattering the Valyrian peninsula. The sky itself seemed to burn as rivers of dragonglass and fire consumed the Freehold. In a single day, the greatest civilization in the known world was erased, leaving behind only the 'Smoking Sea'.",
        "**LOST SECRETS:** With the fall of Valyria, the world lost the art of forging Valyrian Steel and the sorcery required to bind dragons to human will. The city's legendary towers of fused stone melted like wax. Explorers who venture there today rarely return, speaking of twisted monsters and air that burns the lungs.",
        "**THE SURVIVORS:** Twelve years before the Doom, Daenys the Dreamer foresaw this catastrophe. Her father, Aenar Targaryen, moved his entire house to the volcanic island of Dragonstone. They were mocked as cowards, but they became the last keepers of dragonflame in a world of ashes."
    ],
    "era-conquest": [
        "**THE MANIFESTO:** Aegon Targaryen looked West from Dragonstone and saw not seven kingdoms, but one realm waiting to be forged. Alongside his sister-wives, Visenya and Rhaenys, he landed at the mouth of the Blackwater Rush, beginning a campaign that would change history forever.",
        "**THE FIELD OF FIRE:** The combined might of the Reach and the Rock met the Targaryens in open battle. For the only time in history, all three dragons—Balerion, Vhagar, and Meraxes—were unleashed at once. 4,000 men burned to death, and the power of the old kings died with them.",
        "**A NEW ORDER:** After the surrender of Oldtown, Aegon was crowned King. He took the swords of his fallen enemies and, using Balerion’s dragonfire, forged the Iron Throne. It was designed to be uncomfortable, for a king should never sit easy on his seat of power."
    ],
    "era-faith": [
        "**THE HOLY REBELLION:** Upon the death of Aegon I, the Faith of the Seven rose against the Targaryen 'abomination'. The Faith Militant, consisting of the Warrior's Sons and Poor Fellows, turned the streets of King’s Landing into a bloody battlefield against King Maegor I.",
        "**MAEGOR’S VENGEANCE:** Known as 'The Cruel', Maegor mounted Balerion and burned the Sept of Remembrance. He set a bounty on the Faith: a gold dragon for the scalp of a Warrior’s Son and a silver stag for a Poor Fellow. The conflict only ended when the Targaryens agreed to protect the Faith in exchange for their disarmament.",
        "**THE DOCTRINE:** To prevent future wars, King Jaehaerys I established the 'Doctrine of Exceptionalism'. It stated that Targaryens, being closer to gods than men, were not bound by the same religious laws regarding marriage—effectively legalizing their ancient Valyrian traditions."
    ],
    "era-council": [
        "**THE CRISIS:** When Prince Aemon and Prince Baelon died, the succession of the Iron Throne became unclear. To avoid a civil war between the supporters of Prince Viserys and Princess Rhaenys, the Old King Jaehaerys summoned a Great Council at the ruins of Harrenhal.",
        "**THE VOTE:** Over a thousand lords from across Westeros gathered to cast their ballots. It was the largest gathering of nobility in history. The council eventually chose Viserys I, establishing the controversial precedent that the Iron Throne could not pass to a woman or through a female line.",
        "**THE AFTERMATH:** While the Great Council of 101 AC brought temporary peace, it planted the seeds of the 'Dance of the Dragons'. By choosing male-only succession, the lords had inadvertently challenged the future rights of Rhaenyra Targaryen, Viserys's chosen heir."
    ],
    "era-dance": [
        "**A HOUSE DIVIDED:** Following the death of Viserys I, the Red Keep split into two factions: The Greens (supporting Aegon II) and The Blacks (supporting Rhaenyra). Family turned against family, and the skies of Westeros became a graveyard for dragons.",
        "**THE BATTLE ABOVE GOD'S EYE:** The war reached its peak when Prince Daemon on Caraxes met Prince Aemond on Vhagar over Harrenhal. In a legendary duel, both dragons and their riders plummeted into the lake. Neither rider survived, and the era of the greatest dragonriders ended there.",
        "**THE DYING OF THE DRAGONS:** By the end of the Dance, nearly all the dragons were dead. The Targaryen power was permanently crippled. Although the war ended with Aegon III on the throne, the magic of Valyria had faded, leaving the kings to rule with steel instead of fire."
    ],
    "era-tragedy": [
        "**THE PROPHESY:** King Aegon V, obsessed with bringing dragons back to restore the Targaryen glory, gathered his family at the palace of Summerhall. He believed that seven dragon eggs could be hatched using secret rituals involving wildfire and blood magic.",
        "**THE INFERNO:** Something went horribly wrong. The wildfire erupted out of control, consuming the palace and killing King Aegon V, Prince Duncan the Small, and Ser Duncan the Tall. The tragedy left the Targaryen line hanging by a thread.",
        "**A BITTERSWEET BIRTH:** As Summerhall burned, Princess Shaera gave birth to Rhaegar Targaryen nearby. Rhaegar grew up with a melancholy soul, forever drawn to the ruins of Summerhall, believing his life was inextricably linked to the prophecy of the 'Prince That Was Promised'."
    ]
};

let currentPage = 0;
let currentEventId = "";

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('archive-modal');
    const closeBtn = document.querySelector('.close-modal');
    const nextBtn = document.getElementById('next-page');
    const prevBtn = document.getElementById('prev-page');

    // --- FUNCTION: Page Update Logic ---
    const updatePageContent = () => {
        const loreArray = eventLore[currentEventId];
        const textContainer = document.getElementById('modal-text-content');
        
        if (loreArray && textContainer) {
            textContainer.innerHTML = `<p class="fade-in-text">${loreArray[currentPage]}</p>`;
            
            // Numbers update
            document.getElementById('current-page-num').innerText = `0${currentPage + 1}`;
            document.getElementById('total-pages-num').innerText = `0${loreArray.length}`;
        }
    };

    //  Open Digital Codex ---
    const openArchive = (card) => {
        if (!card) return;
        
        currentEventId = card.id;
        currentPage = 0; 

        const title = card.querySelector('.modern-glitch').innerText;
        const imgSrc = card.querySelector('.artifact-img').src;

        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-img').src = imgSrc;

        updatePageContent();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    };

    // 1. CARD BUTTONS (Access Full Records)
    document.querySelectorAll('.access-archive-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.ancient-card');
            openArchive(card);
        });
    });

    // 2. NAVBAR LINKS (Direct Open)
    document.querySelectorAll('.era-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); 
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                openArchive(targetCard);
            }
        });
    });

    // 3. BOOK NAVIGATION (Next/Prev)
    nextBtn.addEventListener('click', () => {
        if (currentEventId && currentPage < eventLore[currentEventId].length - 1) {
            currentPage++;
            updatePageContent();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePageContent();
        }
    });

    // 4. CLOSE SYSTEM
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// NAVBAR RESPONSIVE 
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('active');
    menuLinks.classList.toggle('active');
});

// Link click hone par menu band ho jaye
document.querySelectorAll('.nav-item, .nav-btn').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('active');
    menuLinks.classList.remove('active');
}));