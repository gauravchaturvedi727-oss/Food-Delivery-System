import "./Categories.css";

const categories = [
    {
        id: 1,
        name: "Pizza",
        icon: "🍕",
    },
    {
        id: 2,
        name: "Burger",
        icon: "🍔",
    },
    {
        id: 3,
        name: "Noodles",
        icon: "🍜",
    },
    {
        id: 4,
        name: "Salad",
        icon: "🥗",
    },
    {
        id: 5,
        name: "Dessert",
        icon: "🍰",
    },
    {
        id: 6,
        name: "Drinks",
        icon: "🥤",
    },
];

function Categories() {
    return (
        <section className="categories">

            <h2>Browse By Category</h2>

            <div className="category-grid">

                {categories.map((category) => (
                    <div className="category-card" key={category.id}>

                        <span className="category-icon">
                            {category.icon}
                        </span>

                        <h3>{category.name}</h3>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default Categories;