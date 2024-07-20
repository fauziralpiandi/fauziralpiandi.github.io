async function fetchData() {
	const response = await fetch("config.yml");
	const text = await response.text();
	return jsyaml.load(text);
}

async function renderContent() {
	const data = await fetchData();

	document.getElementById("title").src = data.title;
	document.getElementById("hero").src = data.hero;
	document.getElementById("name").textContent = data.name;
	document.getElementById("desc").textContent = data.desc;

	const socialContainer = document.getElementById("social");
	data.social.forEach((icon) => {
		const socialLink = document.createElement("a");
		socialLink.href = icon.href;
		socialLink.target = "_blank";
		const img = document.createElement("img");
		img.src = icon.icon;
		img.alt = icon.alt;
		img.className = "w-8 h-8";
		socialLink.appendChild(img);
		socialContainer.appendChild(socialLink);
	});

	const featuredContainer = document.getElementById("featured");
	data.featured.forEach((link) => {
		const linkCard = document.createElement("sections");
		linkCard.href = link.href;
		linkCard.className =
			"block p-6 bg-white rounded-lg shadow hover:bg-gray-50 text-center";

		const img = document.createElement("img");
		img.src = link.icon;
		img.alt = link.text;
		img.className = "w-12 h-12 mx-auto mb-4";

		const h2 = document.createElement("h2");
		h2.className = "text-2xl font-bold mb-2";
		h2.textContent = link.text;

		const p = document.createElement("p");
		p.textContent = link.desc;

		linkCard.appendChild(img);
		linkCard.appendChild(h2);
		linkCard.appendChild(p);

		featuredContainer.appendChild(linkCard);
	});

	document.getElementById("footer").textContent = data.footer;
	
	mediumZoom("#hero", "#featured", {
		margin: 24,
		background: "#fff",
		scrollOffset: 0,
	});
}

renderContent();
