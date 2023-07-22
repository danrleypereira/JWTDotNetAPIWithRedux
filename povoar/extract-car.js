const carElements = document.querySelectorAll("app-card-car");

const carData = [];

carElements.forEach((car) => {
  const imageSrc = car.querySelector(".card-header img").getAttribute("src");
  const price = car.querySelector(".payment-total.payment-highlight").textContent.trim();
  const name = car.querySelector(".car-name").textContent.trim();

  const carDetails = car.querySelector(".car-details").textContent.trim();
  const [year, km, city] = carDetails.split(" • ");

  carData.push({
    imageSrc,
    price,
    name,
    year,
    km,
    city,
  });
});

// Convert carData to CSV string
let csvContent = "data:text/csv;charset=utf-8," + "Image Source,Price,Name,Year,Kilometers,City\n";

carData.forEach((car) => {
  csvContent += `"${car.imageSrc}","${car.price}","${car.name}","${car.year}","${car.km}","${car.city}"\n`;
});

// Create a hidden link and trigger download
const encodedUri = encodeURI(csvContent);
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "car_data.csv");
document.body.appendChild(link);
link.click();
