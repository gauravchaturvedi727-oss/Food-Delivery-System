import "./Hero.css";

function Hero() {

    function scrollToMenu() {

        const menu = document.getElementById("menu");

        if (menu) {

            menu.scrollIntoView({
                behavior: "smooth"
            });

        }

    }

    return (

        <section className="hero">

            <div className="hero-left">

                <span className="tag">
                    🍔 Fast Delivery
                </span>

                <h1>
                    Delicious Food
                    <br />
                    Delivered
                    <span> Fast.</span>
                </h1>

                <p>
                    Order fresh meals from your favourite restaurants
                    and get them delivered to your doorstep in minutes.
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={scrollToMenu}
                    >
                        Order Now
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={scrollToMenu}
                    >
                        Explore Menu
                    </button>

                </div>

            </div>

            <div className="hero-right">

                <img
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
                    alt="Pizza"
                />

            </div>

        </section>

    );
}

export default Hero;