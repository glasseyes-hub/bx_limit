class Cart {
  animationSpeed = 300;

  constructor(container) {
    this.container = container;
    this.details = this.container.find($(".cart-details"));

    this.details.hide();

    this.container.hover(
      () => {
        this.container.addClass("cart_open");
        this.details.show(this.animationSpeed);
      },
      () => {
        this.container.removeClass("cart_open");
        this.details.hide(this.animationSpeed);
      }
    );
  }
}

new Cart($(".cart"));
