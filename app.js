const pages = {
  "index.html": { title: "Coffee for the unhurried", label: "A neighborhood coffee house", intro: "Good coffee, kind people, and a little more room to breathe." },
  "shop.html": { title: "The coffee & menu", label: "Made with good things", intro: "Meet your next everyday favorite, from slow-pulled espresso to beans roasted right here." },
  "about.html": { title: "A good cup brings us together", label: "The Ashleyloyleyy way", intro: "We believe the best things happen when you make a little space to slow down." },
  "profile.html": { title: "Good coffee. Good company.", label: "Company profile", intro: "An independent neighborhood cafe and small-batch roastery, built around a simple idea: make people feel at home." },
  "org-chart.html": { title: "The people behind your cup", label: "Meet our crew", intro: "A small, curious team with a shared love for thoughtful coffee and the people who drink it." },
  "history.html": { title: "A little coffee, a lot of heart", label: "Our story", intro: "From one espresso machine on a quiet corner to a roastery and a room full of familiar faces." },
  "reservation.html": { title: "Save yourself a seat", label: "Come on in", intro: "Pick your spot, bring your people, and we’ll have a table ready. Walk-ins are always welcome, too." },
  "services.html": { title: "Good coffee, wherever you gather", label: "A little more Ashleyloyleyy", intro: "From your office morning to your wedding afternoon, our crew brings the good stuff to you." },
  "contact.html": { title: "We’d love to hear from you", label: "Say hello", intro: "Questions about the menu, an event, or just what’s brewing? We’re always happy to chat." },
  "faq.html": { title: "A few good questions", label: "The little details", intro: "Everything you might want to know before your first sip, visit, or coffee order." },
  "portfolio.html": { title: "A look around our little world", label: "The Ashleyloyleyy journal", intro: "A few favorite moments from behind the bar, around the table, and out in the neighborhood." },
  "checkout.html": { title: "Your bag, your way", label: "Almost the good part", intro: "Choose how you’d like to enjoy your order. We’ll take it from here." },
  "payment.html": { title: "Let’s make it official", label: "Secure checkout", intro: "One last step before your Ashleyloyleyy favorites are on their way." },
  "orders.html": { title: "Good things are on their way", label: "Your Ashleyloyleyy account", intro: "Keep an eye on an order, revisit a past favorite, or check on your next cafe visit." }
};

const products = [
  { id: "flat-white", name: "Honey oat flat white", category: "Hot espresso", price: 5.5, notes: "Double espresso, steamed oat milk, a little wildflower honey.", options: ["8 oz", "12 oz"], art: "A little honey" },
  { id: "cappuccino", name: "House cappuccino", category: "Hot espresso", price: 4.75, notes: "Our caramel-sweet house espresso, velvety milk, cocoa dust.", options: ["6 oz", "8 oz"], art: "The everyday cup" },
  { id: "espresso", name: "Seasonal espresso", category: "Hot espresso", price: 3.75, notes: "Sweet orange, dark chocolate, and a lovely lingering finish.", options: ["Double", "With tonic"], art: "Bright & balanced" },
  { id: "cold-brew", name: "Slow-steep cold brew", category: "Iced & cold", price: 5.25, notes: "18-hour steep, milk chocolate, toasted pecan, no rush.", options: ["12 oz", "16 oz"], art: "Steeped slowly" },
  { id: "maple-latte", name: "Maple sea-salt latte", category: "Iced & cold", price: 6, notes: "A house-made maple syrup, espresso, and a tiny pinch of salt.", options: ["Iced", "Hot"], art: "A pinch of sweet" },
  { id: "morning-bun", name: "Brown butter morning bun", category: "Bakery", price: 4.5, notes: "Laminated by hand, rolled in cinnamon sugar, baked each morning.", options: ["Fresh daily", "Vegetarian"], art: "From our oven" },
  { id: "olive-cake", name: "Lemon olive oil cake", category: "Bakery", price: 5, notes: "Bright lemon, fruity olive oil, and a soft, tender crumb.", options: ["Slice", "Contains dairy"], art: "A sunny slice" },
  { id: "house-beans", name: "Ashleyloyleyy house blend", category: "Whole beans", price: 19, notes: "Chocolate, ripe pear, and hazelnut. A kind start to any morning.", options: ["12 oz", "Whole bean"], art: "Roasted in-house" },
  { id: "ethiopia", name: "Ethiopia — Wush Wush", category: "Whole beans", price: 23, notes: "Peach, jasmine, and bergamot. Light roast, traceable lot.", options: ["12 oz", "Light roast"], art: "A little brighter" },
  { id: "decaf", name: "Night owl decaf", category: "Whole beans", price: 20, notes: "Rich cocoa, toasted almond, Swiss-water process, all the comfort.", options: ["12 oz", "Medium roast"], art: "All the comfort" }
];

const navItems = [
  ["01", "Home", "index.html"], ["02", "Coffee & Menu Shop", "shop.html"],
  ["03", "About", "about.html", [
    ["04", "Company Profile", "profile.html"], ["05", "Org Chart", "org-chart.html"], ["06", "History", "history.html"]
  ]],
  ["07", "Table Reservation", "reservation.html"], ["08", "Services & Catering", "services.html"],
  ["09", "Contact", "contact.html"], ["10", "FAQ", "faq.html"], ["11", "Cafe Gallery", "portfolio.html"],
  ["12", "Featured Blends", "shop.html#featured"], ["13", "Checkout", "checkout.html"], ["14", "Payment", "payment.html"], ["15", "My Orders", "orders.html"]
];
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const getCart = () => JSON.parse(localStorage.getItem("goodkind-cart") || "[]");
const setCart = cart => { localStorage.setItem("goodkind-cart", JSON.stringify(cart)); updateBagCount(); };
const getOrders = () => JSON.parse(localStorage.getItem("goodkind-orders") || "[]");
const currentFile = location.pathname.split("/").pop() || "index.html";
const currentPage = pages[currentFile] ? currentFile : "index.html";
const app = document.querySelector("#app");

function navLink(number, label, href, active) {
  return `<li><a class="nav-link${active ? " active" : ""}" href="${href}"><span class="nav-number">${number}</span><span>${label}</span></a></li>`;
}
function renderFrame(content) {
  const nav = navItems.map(([number, label, href, children]) => {
    if (!children) return navLink(number, label, href, currentPage === href.split("#")[0]);
    const expanded = currentPage === "about.html" || children.some(item => item[2] === currentPage);
    return `<li><button class="nav-parent${expanded ? " active" : ""}" aria-expanded="${expanded}" aria-controls="about-subnav"><span class="nav-number">${number}</span><span>${label}</span><span class="nav-chevron">›</span></button><ul class="subnav" id="about-subnav" ${expanded ? "" : "hidden"}>${navLink("", "Overview", href, currentPage === href)}${children.map(item => navLink(...item, currentPage === item[2])).join("")}</ul></li>`;
  }).join("");
  app.innerHTML = `
    <header class="site-header">
      <button class="menu-toggle" aria-label="Open navigation menu" aria-expanded="false"><span class="menu-icon"></span></button>
      <a class="brand" href="index.html"><span class="brand-mark">A</span><span><span class="brand-name">Ashleyloyleyy</span><span class="brand-tag">COFFEE HOUSE · ROASTED DAILY</span></span></a>
      <div class="cafe-status"><strong>● OPEN TODAY · 7AM—5PM</strong>DINE-IN & PICKUP</div>
      <a class="bag-link" href="checkout.html">YOUR BAG <span class="bag-count">0</span> →</a>
    </header>
    <div class="mobile-overlay"></div>
    <div class="site-layout">
      <nav class="site-nav" aria-label="Main navigation"><p class="nav-caption">A little good, every day</p><ul class="nav-list">${nav}</ul></nav>
      <main class="site-content">${content}</main>
      <aside class="site-aside"><p class="aside-title">A few things we believe</p><ul class="ethos-list"><li><span>01</span>Thoughtfully sourced beans</li><li><span>02</span>Small-batch, always fresh</li><li><span>03</span>Room for everyone here</li></ul><div class="aside-card"><p>Your table is waiting.</p><a href="reservation.html">Find your seat →</a></div></aside>
      <footer class="site-footer"><span>© 2026 Ashleyloyleyy · Made with care, shared with you.</span><span class="footer-links"><a href="shop.html">Coffee & menu</a><a href="reservation.html">Reservations</a><a href="contact.html">Find us</a></span></footer>
    </div><div class="toast" role="status" aria-live="polite"></div>`;
  bindFrame();
}
function pageIntro(page = pages[currentPage]) {
  return `<section class="page-intro"><span class="eyebrow">${page.label}</span><h1 class="page-title">${page.title}</h1><p>${page.intro}</p></section>`;
}
function renderHome() {
  return `<section class="hero"><div class="hero-copy"><span class="eyebrow">A neighborhood coffee house</span><h1>Slow down.<br>Sip with intention.</h1><p>Thoughtful coffee, something warm from the oven, and a seat saved just for you.</p><div class="button-row"><a class="button" href="shop.html">Explore the menu</a><a class="button button-outline" href="reservation.html">Reserve a table</a></div></div></section>
  <div class="section-heading"><div><span class="eyebrow">The good stuff</span><h2>A little something for everyone</h2></div><a class="text-link" href="shop.html">See the full menu →</a></div>
  <div class="feature-grid"><article class="feature-card"><span class="feature-icon">◒</span><h3>Made to brighten your day</h3><p>Seasonal sips, everyday favorites, and pastries made fresh each morning.</p><a class="text-link" href="shop.html">Find your new favorite →</a></article><article class="feature-card"><span class="feature-icon">⌂</span><h3>A seat with your name on it</h3><p>Meet a friend, bring a book, or simply stay for another cup.</p><a class="text-link" href="reservation.html">Save yourself a seat →</a></article><article class="feature-card"><span class="feature-icon">✳</span><h3>Roasted right around the corner</h3><p>Good beans, careful sourcing, and a little patience in every roast.</p><a class="text-link" href="about.html">A bit about us →</a></article></div>
  <div class="quote-band"><p>“A good cup is even better when it’s shared.”</p><span>Come as you are · Stay awhile</span></div>`;
}
function productCard(product) {
  return `<article class="product-card" data-category="${product.category}"><div class="product-art"><span>${product.art}</span></div><div class="product-body"><div class="product-top"><h3>${product.name}</h3><span class="product-price">${currency.format(product.price)}</span></div><p>${product.notes}</p><div class="product-options">${product.options.map(option => `<span>${option}</span>`).join("")}</div><button class="button button-small add-to-bag" data-product="${product.id}">Add to bag</button></div></article>`;
}
function renderShop() {
  return `${pageIntro()}<div class="filter-bar" role="group" aria-label="Filter menu"><button class="filter-button active" data-filter="All">All the good things</button><button class="filter-button" data-filter="Hot espresso">Hot espresso</button><button class="filter-button" data-filter="Iced & cold">Iced & cold</button><button class="filter-button" data-filter="Bakery">Bakery</button><button class="filter-button" data-filter="Whole beans">Whole beans</button></div><section class="product-grid" id="featured">${products.map(productCard).join("")}</section><p class="catalog-note">Our menu changes with the seasons. Have an allergy or a question? <a class="text-link" href="contact.html">Just ask us →</a></p>`;
}
function renderAbout() {
  return `${pageIntro()}<section class="content-panel split-panel"><div><span class="pill">Small cafe, big welcome</span><h2>Good coffee should feel like coming home.</h2><p>Ashleyloyleyy started with a borrowed espresso machine, a few bags of carefully sourced beans, and the hope of making our neighborhood feel a little more like itself. We’re still here for the same reasons: great coffee, generous tables, and familiar faces.</p><p>We work with growers and importers who care for the land and the people behind every harvest. Then we roast in small batches, tasting every day, so the good stuff makes it all the way to your cup.</p><a class="text-link" href="history.html">Read our little story →</a></div><div class="split-image" role="img" aria-label="Freshly brewed coffee at the cafe"></div></section><div class="values-grid"><div class="value-card"><strong>Know where it grows</strong><span>Long-term relationships and transparent sourcing make a difference in every cup.</span></div><div class="value-card"><strong>Make it with care</strong><span>Small batches, good ingredients, and time for things to be done right.</span></div><div class="value-card"><strong>Make room at the table</strong><span>A welcoming space for neighbors, new friends, and anyone who needs a moment.</span></div></div>`;
}
function renderProfile() {
  return `${pageIntro()}<section class="content-panel"><span class="pill">Independent · Neighborhood-rooted · People-first</span><h2>A neighborhood cafe and roastery, since 2018.</h2><p>Ashleyloyleyy is an independent specialty coffee company bringing together a cafe, a small-batch roasting program, and a team of people who love making someone’s day a little better.</p><p><strong>What we do:</strong> carefully sourced espresso and filter coffee, fresh-baked pastries, whole-bean retail, coffee subscriptions, private events, and mobile espresso catering. We serve our neighborhood in person and ship freshly roasted beans to coffee lovers near and far.</p><p><strong>Our mission:</strong> make really good coffee more welcoming, more thoughtful, and a little more part of everyday life.</p></section><div class="values-grid"><div class="value-card"><strong>Our craft</strong><span>Specialty coffee, roasted in small batches and brewed with care.</span></div><div class="value-card"><strong>Our place</strong><span>A calm, friendly gathering spot for the whole neighborhood.</span></div><div class="value-card"><strong>Our promise</strong><span>Kind service, honest sourcing, and quality without the fuss.</span></div></div>`;
}
function renderOrg() {
  const node = (name, role, primary = false) => `<div class="org-node${primary ? " primary" : ""}"><strong>${name}</strong><span>${role}</span></div>`;
  return `${pageIntro()}<section class="content-panel"><h2>One little team, lots of good things.</h2><p>Every cup is a group effort. Here’s the crew that makes Ashleyloyleyy feel like Ashleyloyleyy.</p><div class="org-chart">${node("Ashleyloyleyy", "Founder & Owner", true)}<div class="org-branches">${node("Theo Park", "Head Roaster")}${node("Sam Rivera", "Lead Barista")}${node("Nina Ellis", "Pastry Chef")}${node("Our cafe crew", "Floor & guest care")}</div></div></section>`;
}
function renderHistory() {
  const timeline = [["2018", "One little espresso bar", "We opened our first tiny corner with one espresso machine, four stools, and beans from producers we were proud to know."], ["2020", "Making a little more room", "The neighborhood grew around us. We found a bigger space, added a bakery counter, and started roasting a few blends of our own."], ["2022", "A roastery of our own", "A small drum roaster arrived. Our first house blend was born, and fresh bags began finding their way into local kitchens."], ["Today", "Still growing, still neighbors", "A cafe, roastery, and familiar neighborhood gathering place. Same simple hope: make every visit feel a little like coming home."]];
  return `${pageIntro()}<section class="content-panel"><div class="timeline">${timeline.map(([year, title, copy]) => `<article class="timeline-item"><strong>${year}</strong><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></section>`;
}
function renderReservation() {
  const tables = [["Window nook", [["T1", "2 seats"], ["T2", "2 seats"]]], ["Main cafe floor", [["T3", "4 seats"], ["T4", "4 seats"], ["T5", "4 seats"]]], ["Garden & gathering", [["T6", "4 seats · patio"], ["T7", "6+ · long table"], ["T8", "6+ · meeting booth"]]]];
  return `${pageIntro()}<div class="booking-layout"><section class="floor-plan"><div class="floor-label">☼ Front windows · welcome in ☼</div><div class="table-zones">${tables.map(([zone, seats]) => `<div class="table-zone"><h3>${zone}</h3><div class="table-grid">${seats.map(([id, info]) => { const capacity = Number(id === "T1" || id === "T2" ? 2 : id === "T7" || id === "T8" ? 6 : 4); const reserved = id === "T5"; return `<button class="table-option${reserved ? " reserved" : ""}" data-table="${id}" data-seats="${capacity}" data-reserved="${reserved}" ${reserved ? "disabled" : ""}><strong>${id}</strong><small>${info}</small></button>`; }).join("")}</div></div>`).join("")}</div><div class="booking-legend"><span><i></i>Available</span><span><i class="legend-selected"></i>Selected</span><span><i class="legend-reserved"></i>Reserved</span></div></section><form class="booking-form" id="booking-form"><h2>Make it yours</h2><div class="form-field"><label for="booking-date">Date</label><input id="booking-date" name="date" type="date" required></div><div class="form-field"><label for="booking-time">When are you coming?</label><select id="booking-time" name="time"><option>Morning · 8–11 am</option><option>Afternoon · 11 am–3 pm</option><option>Evening · 3–5 pm</option></select></div><div class="form-field"><label for="guest-count">Your party</label><select id="guest-count" name="guests"><option value="2">2 guests</option><option value="3-4">3–4 guests</option><option value="5+">5+ guests</option></select></div><div class="form-field"><label for="booking-name">Name</label><input id="booking-name" name="name" autocomplete="name" placeholder="Your name" required></div><div class="form-field"><label for="booking-notes">Anything we should know? (optional)</label><textarea id="booking-notes" name="notes" placeholder="A high chair, a birthday, a favorite corner…"></textarea></div><label class="check-row"><input type="checkbox" name="outlet"> A seat near a power outlet, please</label><p class="booking-status" aria-live="polite"></p><button class="button" type="submit" style="width:100%;margin-top:12px">Confirm my table</button></form></div>`;
}
function renderServices() {
  return `${pageIntro()}<div class="service-grid"><article class="service-card"><span class="eyebrow">Bring the bar to you</span><h2>Mobile espresso bar</h2><p>Our baristas, espresso setup, and a just-right menu for weddings, office mornings, and the parties you’ll remember. We’ll tailor the setup to your space and your people.</p><a class="text-link" href="contact.html">Plan an event →</a></article><article class="service-card"><span class="eyebrow">A little good in the mail</span><h2>Coffee subscriptions</h2><p>A fresh bag from our roastery on your schedule. Pick your favorite, change your mind whenever, and make your morning ritual something to look forward to.</p><a class="text-link" href="shop.html">Find your beans →</a></article><article class="service-card"><span class="eyebrow">Get curious together</span><h2>Barista workshops</h2><p>Learn to dial in espresso, pour a heart, or brew a better cup at home. Friendly, hands-on sessions for beginners and curious coffee people alike.</p><a class="text-link" href="contact.html">Ask about a class →</a></article></div><div class="quote-band"><p>Have an idea? We’d love to help make it happen.</p><a class="button button-outline" href="contact.html">Talk to our crew</a></div>`;
}
function renderContact() {
  return `${pageIntro()}<div class="contact-grid"><section class="content-panel"><h2>Come find us.</h2><div class="contact-detail"><span>⌖</span><div><strong>Our neighborhood</strong><small>28 Willow Street, Portland, OR 97205<br>Just around the corner from the little park.</small></div></div><div class="contact-detail"><span>◷</span><div><strong>When the lights are on</strong><small>Every day · 7 am–5 pm<br>Espresso till 4:30 pm, pastries till they’re gone.</small></div></div><div class="contact-detail"><span>✉</span><div><strong>A note for the team</strong><small>hello@ashleyloyleyy.coffee<br>Usually back in your inbox by tomorrow.</small></div></div><p class="inline-note">Wi-Fi is free with a little something from the counter. Seating is first come, first served; we’re glad to see you. Please ask us about ingredients and allergens before ordering.</p></section><form class="content-panel contact-form" id="contact-form"><h2 class="full">Send us a little note.</h2><div class="form-field"><label for="contact-name">Your name</label><input id="contact-name" name="name" autocomplete="name" required></div><div class="form-field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" autocomplete="email" required></div><div class="form-field full"><label for="contact-topic">What’s on your mind?</label><select id="contact-topic" name="topic"><option>Just saying hello</option><option>Private event or catering</option><option>Menu or allergen question</option><option>Wholesale or subscription</option></select></div><div class="form-field full"><label for="contact-message">Your message</label><textarea id="contact-message" name="message" required></textarea></div><div class="full"><button class="button" type="submit">Send your note</button><p class="form-result" aria-live="polite"></p></div></form></div>`;
}
function renderFaq() {
  const qa = [["Do you have dairy-free milk?", "Absolutely. Oat milk is always on the bar, and we can make nearly all espresso drinks with it. Just let your barista know."], ["Can you help with food allergies?", "Our pastries are prepared in a kitchen that handles wheat, dairy, eggs, nuts, and sesame. We’re happy to share ingredient details, but can’t guarantee an allergen-free environment."], ["Can I get my beans ground?", "Of course. Choose the grind that suits your brewer when you order, or tell us what you use at the counter. Whole bean stays freshest the longest."], ["Is there Wi-Fi and space to work?", "Yes, we have complimentary Wi-Fi for cafe guests. Seating is shared and first come, first served; during busy hours, we kindly ask laptop guests to take a break from the big community table."], ["Do you take reservations?", "We welcome walk-ins and offer reservations for select tables. Choose a table on our reservation page, and we’ll have a spot ready for you."], ["Can I bring my dog?", "Leashed dogs are welcome on our patio. Service animals are welcome throughout the cafe."]];
  return `${pageIntro()}<section class="content-panel faq-list">${qa.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</section><p class="inline-note">Still wondering? <a class="text-link" href="contact.html">Send us a note →</a></p>`;
}
function renderPortfolio() {
  const items = [["https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80", "A little heart in your latte", "A quiet moment at the bar"], ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", "Morning, made slowly", "The first pour of the day"], ["https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80", "Roasted right around here", "Small batches, fresh from the roaster"], ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80", "A table full of friends", "There’s always room for one more"], ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80", "The everyday good cup", "Thoughtfully brewed, just for you"], ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80", "Fresh from our little oven", "A flaky morning kind of thing"]];
  return `${pageIntro()}<section class="gallery-grid mobile-single">${items.map(([image, title, caption], i) => `<article class="gallery-item${i === 0 ? " current" : ""}" style="background-image:url('${image}')"><h3>${title}</h3><p>${caption}</p></article>`).join("")}</section><div class="gallery-controls"><span class="gallery-count">01 / ${String(items.length).padStart(2, "0")}</span><div class="button-row"><button class="button button-light button-small gallery-prev">← Previous</button><button class="button button-dark button-small gallery-next">Next →</button></div></div>`;
}
function renderCheckout() {
  const cart = getCart();
  if (!cart.length) return `${pageIntro()}<section class="empty-state"><h2>Your bag is taking a little breather.</h2><p>Fill it with something lovely from the cafe or the roastery.</p><a class="button" href="shop.html">Explore the menu</a></section><div class="content-panel"><h2>Your next visit, perhaps?</h2><p>Grab a favorite seat or plan a little gathering.</p><a class="text-link" href="reservation.html">Save yourself a seat →</a></div>`;
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return `${pageIntro()}<section class="content-panel"><h2>The good stuff in your bag</h2><div class="cart-list">${cart.map(item => `<article class="cart-item"><div><h3>${item.name}</h3><p>${item.category} · ${currency.format(item.price)} each</p></div><div class="quantity-control"><button aria-label="Decrease ${item.name}" data-quantity="-1" data-id="${item.id}">−</button><span>${item.quantity}</span><button aria-label="Increase ${item.name}" data-quantity="1" data-id="${item.id}">+</button></div><button class="remove-item" data-remove="${item.id}">Remove</button></article>`).join("")}</div><div class="cart-summary"><span>Subtotal</span><span>${currency.format(subtotal)}</span></div><p class="inline-note">Taxes, if applicable, are calculated at payment.</p></section><section class="content-panel"><h2>How would you like it?</h2><form id="checkout-form"><div class="choice-grid"><label class="choice-card"><input type="radio" name="fulfillment" value="Store pickup" checked><strong>Store pickup</strong><span>Freshly made at our cafe. Usually ready in about 15 minutes.</span></label><label class="choice-card"><input type="radio" name="fulfillment" value="Dine-in"><strong>Dine-in</strong><span>Enjoy your order at the cafe. Add a table reservation if you like.</span></label><label class="choice-card"><input type="radio" name="fulfillment" value="Local delivery"><strong>Local delivery</strong><span>Delivered nearby. A $4 delivery fee applies.</span></label></div><div class="form-field" id="table-link-field" hidden><label for="order-table">Reserved table (optional)</label><select id="order-table" name="table"><option value="">No table reservation</option>${getOrders().filter(order => order.kind === "reservation").map(order => `<option value="${order.table}">${order.table} · ${order.date} · ${order.time}</option>`).join("")}</select></div><div class="form-field" id="address-field" hidden><label for="delivery-address">Delivery address</label><input id="delivery-address" name="address" placeholder="Street address and apartment"></div><button class="button" type="submit">Continue to payment · ${currency.format(subtotal)}</button><p class="form-result" aria-live="polite"></p></form></section>`;
}
function renderPayment() {
  const cart = getCart();
  if (!cart.length) return `${pageIntro()}<section class="empty-state"><h2>Nothing to pay for just yet.</h2><p>Your bag’s ready when you are.</p><a class="button" href="shop.html">Browse the menu</a></section>`;
  const draft = JSON.parse(sessionStorage.getItem("goodkind-checkout") || "{}");
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0) + (draft.fulfillment === "Local delivery" ? 4 : 0);
  return `${pageIntro()}<section class="content-panel"><h2>Order summary</h2><p>${cart.reduce((sum, item) => sum + item.quantity, 0)} lovely thing(s) · ${draft.fulfillment || "Store pickup"} · ${currency.format(subtotal)}</p><p class="inline-note">This is a demo checkout. No card details are stored or sent, and no real payment will be taken.</p></section><form class="content-panel" id="payment-form"><h2>Mock payment</h2><div class="form-field"><label for="payer-name">Name on order</label><input id="payer-name" name="name" autocomplete="name" required></div><div class="form-field"><label for="payer-email">Email for your receipt</label><input id="payer-email" name="email" type="email" autocomplete="email" required></div><div class="form-field"><label>Payment method</label><select name="method"><option>Demo card · no charge</option><option>Pay at cafe</option></select></div><button class="button" type="submit">Place demo order · ${currency.format(subtotal)}</button><p class="form-result" aria-live="polite"></p></form>`;
}
function renderOrders() {
  const orders = getOrders();
  const reservations = orders.filter(order => order.kind === "reservation");
  const purchases = orders.filter(order => order.kind === "purchase");
  return `${pageIntro()}<div class="order-tabs"><button class="filter-button active" data-order-tab="purchases">Orders (${purchases.length})</button><button class="filter-button" data-order-tab="reservations">Reservations (${reservations.length})</button></div><section id="order-list">${renderOrderList(purchases, "purchase")}</section>`;
}
function renderOrderList(orders, kind) {
  if (!orders.length) return `<section class="empty-state"><h2>No ${kind === "purchase" ? "orders" : "reservations"} just yet.</h2><p>${kind === "purchase" ? "Your next favorite is waiting at the cafe." : "A good seat and a good cup are just a few clicks away."}</p><a class="button" href="${kind === "purchase" ? "shop.html" : "reservation.html"}">${kind === "purchase" ? "Browse the menu" : "Reserve a table"}</a></section>`;
  return orders.map(order => `<article class="order-card"><div class="order-card-header"><div><h2>${order.kind === "reservation" ? `Table ${order.table} · ${order.guests === "2" ? "2 guests" : order.guests === "3-4" ? "3–4 guests" : "5+ guests"}` : `Ashleyloyleyy order ${order.id}`}</h2><p>${order.kind === "reservation" ? `${order.date} · ${order.time}${order.name ? ` · ${order.name}` : ""}` : `${order.date} · ${order.fulfillment} · ${order.email || ""}`}</p></div><span class="order-status">${order.kind === "reservation" ? "Confirmed" : order.status || "Received"}</span></div>${order.kind === "purchase" ? `<div class="order-lines"><span>${order.items.map(item => `${item.quantity} × ${item.name}`).join(" · ")}</span><strong>${currency.format(order.total)}</strong></div><div class="order-steps"><span class="done"></span><span class="${order.status === "Preparing" || order.status === "Ready" ? "done" : ""}"></span><span class="${order.status === "Ready" ? "done" : ""}"></span></div>` : `<p style="margin-top:12px">${order.notes || "We can’t wait to see you."}${order.outlet ? " · Power outlet requested" : ""}</p>`}</article>`).join("");
}
function renderCurrentPage() {
  const renderers = {
    "shop.html": renderShop, "about.html": renderAbout, "profile.html": renderProfile, "org-chart.html": renderOrg,
    "history.html": renderHistory, "reservation.html": renderReservation, "services.html": renderServices,
    "contact.html": renderContact, "faq.html": renderFaq, "portfolio.html": renderPortfolio,
    "checkout.html": renderCheckout, "payment.html": renderPayment, "orders.html": renderOrders
  };
  return renderFrame(currentPage === "index.html" ? renderHome() : renderers[currentPage]());
}

function updateBagCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".bag-count").forEach(element => { element.textContent = count; });
}
function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2300);
}
function bindFrame() {
  updateBagCount();
  const status = document.querySelector(".cafe-status strong");
  const isOpen = new Date().getHours() >= 7 && new Date().getHours() < 17;
  status.textContent = isOpen ? "● OPEN NOW · UNTIL 5PM" : "● CLOSED NOW · OPENS AT 7AM";
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = () => { document.body.classList.remove("nav-open"); menuToggle.setAttribute("aria-expanded", "false"); };
  menuToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelector(".mobile-overlay").addEventListener("click", closeMenu);
  document.querySelectorAll(".site-nav a").forEach(link => link.addEventListener("click", closeMenu));
  const parent = document.querySelector(".nav-parent");
  parent.addEventListener("click", () => {
    const expanded = parent.getAttribute("aria-expanded") === "true";
    parent.setAttribute("aria-expanded", String(!expanded));
    document.querySelector("#about-subnav").hidden = expanded;
  });
  document.querySelectorAll(".add-to-bag").forEach(button => button.addEventListener("click", () => {
    const product = products.find(item => item.id === button.dataset.product);
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    setCart(cart);
    showToast(`${product.name} added to your bag.`);
  }));
  document.querySelectorAll(".filter-button[data-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button[data-filter]").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll(".product-card").forEach(card => { card.hidden = button.dataset.filter !== "All" && card.dataset.category !== button.dataset.filter; });
  }));
  document.querySelectorAll("[data-quantity]").forEach(button => button.addEventListener("click", () => {
    const cart = getCart();
    const item = cart.find(entry => entry.id === button.dataset.id);
    if (item) item.quantity += Number(button.dataset.quantity);
    setCart(cart.filter(entry => entry.quantity > 0));
    renderCurrentPage();
  }));
  document.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => {
    setCart(getCart().filter(item => item.id !== button.dataset.remove));
    renderCurrentPage();
  }));
  bindBooking();
  bindContact();
  bindCheckout();
  bindPayment();
  bindPortfolio();
  bindOrderTabs();
}
function bindBooking() {
  const form = document.querySelector("#booking-form");
  if (!form) return;
  const dateInput = form.querySelector('[name="date"]');
  const today = new Date();
  dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  let selected = "";
  const tableButtons = [...document.querySelectorAll(".table-option")];
  const refreshTables = () => {
    const guests = form.querySelector('[name="guests"]').value;
    const requiredSeats = guests === "2" ? 2 : guests === "3-4" ? 3 : 5;
    tableButtons.forEach(button => {
      const reserved = button.dataset.reserved === "true";
      const fits = Number(button.dataset.seats) >= requiredSeats;
      button.disabled = reserved || !fits;
      button.classList.toggle("unavailable", !reserved && !fits);
      if (!fits && button.dataset.table === selected) {
        button.classList.remove("selected");
        selected = "";
      }
    });
  };
  form.querySelector('[name="guests"]').addEventListener("change", refreshTables);
  tableButtons.filter(button => button.dataset.reserved !== "true").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".table-option").forEach(table => table.classList.remove("selected"));
    button.classList.add("selected");
    selected = button.dataset.table;
  }));
  refreshTables();
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = form.querySelector(".booking-status");
    if (!selected) { status.textContent = "Choose an available table on the floor plan first."; status.style.color = "#a34f36"; return; }
    const values = new FormData(form);
    const reservation = { kind: "reservation", id: Date.now().toString(36), table: selected, date: values.get("date"), time: values.get("time"), guests: values.get("guests"), name: values.get("name"), notes: values.get("notes"), outlet: values.has("outlet"), dateCreated: new Date().toLocaleDateString() };
    const orders = getOrders();
    orders.unshift(reservation);
    localStorage.setItem("goodkind-orders", JSON.stringify(orders));
    status.style.color = "";
    status.textContent = `You’re all set, ${reservation.name}! Table ${selected} for ${reservation.guests} on ${reservation.date}, ${reservation.time}. See you soon!`;
    showToast("Your table is confirmed.");
  });
}
function bindContact() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    form.querySelector(".form-result").textContent = "Thanks for your note! This demo form is ready to connect to your inbox.";
    form.reset();
  });
}
function bindCheckout() {
  const form = document.querySelector("#checkout-form");
  if (!form) return;
  const updateFields = () => {
    const fulfillment = form.querySelector('[name="fulfillment"]:checked').value;
    form.querySelector("#table-link-field").hidden = fulfillment !== "Dine-in";
    form.querySelector("#address-field").hidden = fulfillment !== "Local delivery";
    form.querySelector("#delivery-address").required = fulfillment === "Local delivery";
  };
  form.querySelectorAll('[name="fulfillment"]').forEach(radio => radio.addEventListener("change", updateFields));
  updateFields();
  form.addEventListener("submit", event => {
    event.preventDefault();
    const values = new FormData(form);
    const fulfillment = values.get("fulfillment");
    const draft = { fulfillment, table: values.get("table"), address: values.get("address") };
    sessionStorage.setItem("goodkind-checkout", JSON.stringify(draft));
    location.href = "payment.html";
  });
}
function bindPayment() {
  const form = document.querySelector("#payment-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const values = new FormData(form);
    const cart = getCart();
    if (!cart.length) { location.href = "checkout.html"; return; }
    const draft = JSON.parse(sessionStorage.getItem("goodkind-checkout") || "{}");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + (draft.fulfillment === "Local delivery" ? 4 : 0);
    const order = { kind: "purchase", id: Math.random().toString(36).slice(2, 8).toUpperCase(), date: new Date().toLocaleString(), fulfillment: draft.fulfillment || "Store pickup", address: draft.address, table: draft.table, email: values.get("email"), items: cart.map(({ id, name, quantity, price }) => ({ id, name, quantity, price })), total, status: "Received" };
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem("goodkind-orders", JSON.stringify(orders));
    setCart([]);
    sessionStorage.removeItem("goodkind-checkout");
    app.querySelector(".site-content").innerHTML = `${pageIntro({ label: "It’s official", title: "Thanks for choosing Ashleyloyleyy.", intro: "Your demo order is in our system. We can’t wait to make something lovely for you." })}<section class="empty-state"><span class="pill">Order ${order.id} · ${order.fulfillment}</span><h2>You’re all set, ${values.get("name")}.</h2><p>We’ve noted your order and the demo receipt is ready. Track it anytime in My Orders.</p><a class="button" href="orders.html">Track my order</a></section>`;
  });
}
function bindPortfolio() {
  const gallery = document.querySelector(".gallery-grid");
  if (!gallery) return;
  const items = [...gallery.querySelectorAll(".gallery-item")];
  let index = 0;
  const show = next => {
    index = (next + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle("current", i === index));
    gallery.style.setProperty("--gallery-index", index);
    const count = document.querySelector(".gallery-count");
    if (count) count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
  };
  document.querySelector(".gallery-prev").addEventListener("click", () => show(index - 1));
  document.querySelector(".gallery-next").addEventListener("click", () => show(index + 1));
}
function bindOrderTabs() {
  const tabs = document.querySelectorAll("[data-order-tab]");
  if (!tabs.length) return;
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.toggle("active", item === tab));
    const kind = tab.dataset.orderTab === "purchases" ? "purchase" : "reservation";
    document.querySelector("#order-list").innerHTML = renderOrderList(getOrders().filter(order => order.kind === kind), kind);
  }));
}

renderCurrentPage();
