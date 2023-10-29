describe("Email", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1536, 960);
    });

    it("Summarise Inputted Text", () => {
        cy.get("#inputted-text").type(
            "Arbitrage betting is to place wagers on opposite sides of the same sporting event. They must be placed at odds that guarantee a profit regardless of the outcome. On simultaneously available odds, this will generally only occur at different sportsbooks. You may find opportunities for arbitrage at the same sportsbook due to odds movement. Still, it is best to avoid arbitrage betting at one sportsbook. How Arbitrage Betting Works You may have heard of the concept of arbitrage betting and wonder how arbitrage betting works exactly. Arbitrage sounds fairly complex but can be broken down into simpler terms. While there are a few different ways to locate arbitrage opportunities in betting, they all come down to one concept. Arbitrage is when you can place two bets on the same sporting event and guarantee a profit regardless of the outcome. This is done by locating betting odds on both sides of the event that enable this. You will generally need to place one bet on one sportsbook and the other on another. One reason is that it is fairly uncommon that a sportsbook would enable an in-house arbitrage opportunity. This would guarantee a loss for the house. On top of it, it would be easy to spot an arbitrage bettor who is taking advantage of these types of opportunities at one sportsbook. You would likely be limited or banned by the sportsbook very quickly.",
            { delay: 0 }
        );
        cy.get("#summarise-button-id").click();

        cy.wait(25000);
        cy.get("#History").click();
        cy.get("#View").click();
        cy.get("#EmailInput").type("textinsights@gmail.com");
        cy.get("#EmailSummary").click();
        cy.wait(5000);
        cy.on("window:alert", (t) => {
            // assertions
            expect(t).to.contains("Email Sent!");
        });
    });
});
