describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Ilkka',
        username: 'ilkkaL',
        password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
        cy.contains('username')
        cy.contains('Log in to application')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('ilkkaL')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('welcome')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.contains('Wrong username or password')
        })
      })
      describe.only('When logged in', function() {
        beforeEach(function() {
            cy.contains('log in').click()
            cy.get('#username').type('ilkkaL')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#author').type('ilkka')
            cy.get('#title').type('kahvi on hyvää')
            cy.get('#url').type('hs.fi')
            cy.get('#likes').type('5')
            cy.get('#submit').click()

            cy.contains('new blog created')
        })

        it('Blog can be liked', function() {
            
            cy.contains('new blog').click()
            cy.get('#author').type('ilkka')
            cy.get('#title').type('kahvi on hyvää')
            cy.get('#url').type('hs.fi')
            cy.get('#likes').type('5')
            cy.get('#submit').click()

            cy.contains('show').click()

            cy.get('#like').click()

            cy.contains('6')
        })

        it('Blog can be deleted', function() {
            
            cy.contains('new blog').click()
            cy.get('#author').type('ilkka')
            cy.get('#title').type('kahvi on hyvää')
            cy.get('#url').type('hs.fi')
            cy.get('#likes').type('5')
            cy.get('#submit').click()

            cy.contains('show').click()

            cy.get('#delete').click()

            cy.should('not.contain', 'kahvi on hyvää')
        })

        
      })
      

      describe.only('When logged in', function() {
        beforeEach(function() {
            cy.contains('log in').click()
            cy.get('#username').type('ilkkaL')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('new blog').click()
            cy.get('#author').type('näätä')
            cy.get('#title').type('kaikki tykkää näädistä')
            cy.get('#url').type('naata.fi')
            cy.get('#likes').type('1')
            cy.get('#submit').click()

            cy.contains('new blog').click()
            cy.get('#author').type('ilkka')
            cy.get('#title').type('kahvi on hyvää')
            cy.get('#url').type('hs.fi')
            cy.get('#likes').type('5')
            cy.get('#submit').click()
        })
        it('Blogs are sorted correctly', function() {
            cy.contains('show').click()
            cy.get('#like').click()
            cy.get('.blog').first().children().contains('kahvi on hyvää')
            cy.get('.blog').last().children().contains('kaikki tykkää näädistä')
        })
    })
  })