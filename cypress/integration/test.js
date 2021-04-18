describe('Lambda Eats App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3008/pizza')
    })

    const testName=() => cy.get('input[name="name"]')
    const testSize=() => cy.get('select[name="size"]')
    const submitBtn = () => cy.get('button[id=submitBtn]')

    describe('Filling out order and have value', () => {
        it('submit button is disabled', () => {
            submitBtn().should('be.disabled')
        })

        it('can type inside the text input', () => {
            testName()
            .should('have.value','')
            .type('My name is Gina')
            .should('have.value','My name is Gina')
        })

        it('can check checkbox', () => {
            cy.get('[type="checkbox"]').check()
        })

        it('can submit the form', () => {
            cy.get('form').submit()
        })
    })
})