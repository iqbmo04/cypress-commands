/* eslint-disable */

// Copied from Cypress develop @ 3.3.1
// Generated by CoffeeScript 2.4.1
(function() {
  var Promise, RESPONSE_TIMEOUT, _;

  _ = Cypress._;

  Promise = Cypress.Promise;

  RESPONSE_TIMEOUT = 22222;

  describe("src/cy/commands/request", function() {
    return context("#request", function() {
      beforeEach(function() {
        Cypress.config("requestBaseUrl", '');
        cy.stub(Cypress, "backend").callThrough();
        return Cypress.config("responseTimeout", RESPONSE_TIMEOUT);
      });
      describe("argument signature", function() {
        beforeEach(function() {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: true,
            status: 200
          });
          this.expectOptionsToBe = function(opts) {
            var options;
            _.defaults(opts, {
              failOnStatusCode: true,
              retryOnNetworkFailure: true,
              retryOnStatusCodeFailure: false,
              gzip: true,
              followRedirect: true,
              timeout: RESPONSE_TIMEOUT,
              method: "GET"
            });
            options = backend.firstCall.args[1];
            _.each(options, function(value, key) {
              return expect(options[key]).to.deep.eq(opts[key], `failed on property: (${key})`);
            });
            return _.each(opts, function(value, key) {
              return expect(opts[key]).to.deep.eq(options[key], `failed on property: (${key})`);
            });
          };
        });

        it("accepts object with url", function() {
          return cy.request({
            url: "http://localhost:8000/foo"
          }).then(() => {
            return this.expectOptionsToBe({
              url: "http://localhost:8000/foo"
            });
          });
        });

        it("accepts object with url, method, headers, body", function() {
          return cy.request({
            url: "http://github.com/users",
            method: "POST",
            body: {
              name: "brian"
            },
            headers: {
              "x-token": "abc123"
            }
          }).then(() => {
            return this.expectOptionsToBe({
              url: "http://github.com/users",
              method: "POST",
              json: true,
              body: {
                name: "brian"
              },
              headers: {
                "x-token": "abc123"
              }
            });
          });
        });
        it("accepts object with url + timeout", function() {
          return cy.request({
            url: "http://localhost:8000/foo",
            timeout: 23456
          }).then(() => {
            return this.expectOptionsToBe({
              url: "http://localhost:8000/foo",
              timeout: 23456
            });
          });
        });
        it("accepts string url", function() {
          return cy.request("http://localhost:8080/status").then(() => {
            return this.expectOptionsToBe({
              url: "http://localhost:8080/status"
            });
          });
        });
        it("accepts method + url", function() {
          return cy.request("DELETE", "http://localhost:1234/users/1").then(() => {
            return this.expectOptionsToBe({
              url: "http://localhost:1234/users/1",
              method: "DELETE"
            });
          });
        });
        it("accepts method + url + body", function() {
          return cy.request("POST", "http://localhost:8080/users", {
            name: "brian"
          }).then(() => {
            return this.expectOptionsToBe({
              url: "http://localhost:8080/users",
              method: "POST",
              body: {
                name: "brian"
              },
              json: true
            });
          });
        });
        it("accepts url + body", function() {
          return cy.request("http://www.github.com/projects/foo", {
            commits: true
          }).then(() => {
            return this.expectOptionsToBe({
              url: "http://www.github.com/projects/foo",
              body: {
                commits: true
              },
              json: true
            });
          });
        });
        it("accepts url + string body", function() {
          return cy.request("http://www.github.com/projects/foo", "foo").then(() => {
            return this.expectOptionsToBe({
              url: "http://www.github.com/projects/foo",
              body: "foo"
            });
          });
        });
        context("method normalization", function() {
          return it("uppercases method", function() {
            return cy.request("post", "https://www.foo.com").then(() => {
              return this.expectOptionsToBe({
                url: "https://www.foo.com/",
                method: "POST"
              });
            });
          });
        });
        context("url normalization", function() {
          it("uses absolute urls and adds trailing slash", function() {
            Cypress.config("baseUrl", "http://localhost:8080/app");
            return cy.request("https://www.foo.com").then(() => {
              return this.expectOptionsToBe({
                url: "https://www.foo.com/"
              });
            });
          });
          it("uses localhost urls", function() {
            return cy.request("localhost:1234").then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:1234/"
              });
            });
          });
          it("uses www urls", function() {
            return cy.request("www.foo.com").then(() => {
              return this.expectOptionsToBe({
                url: "http://www.foo.com/"
              });
            });
          });
          it("prefixes with baseUrl when origin is empty", function() {
            cy.stub(cy, "getRemoteLocation").withArgs("origin").returns("");
            Cypress.config("baseUrl", "http://localhost:8080/app");
            return cy.request("/foo/bar?cat=1").then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8080/app/foo/bar?cat=1"
              });
            });
          });
          return it("prefixes with baseUrl over current origin", function() {
            Cypress.config("baseUrl", "http://localhost:8080/app");
            cy.stub(cy, "getRemoteLocation").withArgs("origin").returns("http://localhost:1234");
            return cy.request("foobar?cat=1").then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8080/app/foobar?cat=1"
              });
            });
          });
        });
        context("gzip", function() {
          return it("can turn off gzipping", function() {
            return cy.request({
              url: "http://localhost:8080",
              gzip: false
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8080/",
                gzip: false
              });
            });
          });
        });
        context("auth", function() {
          return it("sends auth when it is an object", function() {
            return cy.request({
              url: "http://localhost:8888",
              auth: {
                user: "brian",
                pass: "password"
              }
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                auth: {
                  user: "brian",
                  pass: "password"
                }
              });
            });
          });
        });
        context("followRedirect", function() {
          it("is true by default", function() {
            return cy.request("http://localhost:8888").then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/"
              });
            });
          });
          it("can be set to false", function() {
            return cy.request({
              url: "http://localhost:8888",
              followRedirect: false
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                followRedirect: false
              });
            });
          });
          return it("normalizes followRedirects -> followRedirect", function() {
            return cy.request({
              url: "http://localhost:8888",
              followRedirects: false
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                followRedirect: false
              });
            });
          });
        });
        context("qs", function() {
          return it("accepts an object literal", function() {
            return cy.request({
              url: "http://localhost:8888",
              qs: {
                foo: "bar"
              }
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                qs: {
                  foo: "bar"
                }
              });
            });
          });
        });
        return context("form", function() {
          it("accepts an object literal for body", function() {
            return cy.request({
              url: "http://localhost:8888",
              form: true,
              body: {
                foo: "bar"
              }
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                form: true,
                body: {
                  foo: "bar"
                }
              });
            });
          });
          it("accepts a string for body", function() {
            return cy.request({
              url: "http://localhost:8888",
              form: true,
              body: "foo=bar&baz=quux"
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                form: true,
                body: "foo=bar&baz=quux"
              });
            });
          });
          //# https://github.com/cypress-io/cypress/issues/2923
          return it("application/x-www-form-urlencoded w/ an object body uses form: true", function() {
            return cy.request({
              url: "http://localhost:8888",
              headers: {
                "a": "b",
                "Content-type": "application/x-www-form-urlencoded"
              },
              body: {
                foo: "bar"
              }
            }).then(() => {
              return this.expectOptionsToBe({
                url: "http://localhost:8888/",
                form: true,
                headers: {
                  "a": "b",
                  "Content-type": "application/x-www-form-urlencoded"
                },
                body: {
                  foo: "bar"
                }
              });
            });
          });
        });
      });
      describe("failOnStatus", function() {
        return it("is deprecated but does not fail even on 500 when failOnStatus=false", function() {
          var backend, warning;
          warning = cy.spy(Cypress.utils, "warning");
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: false,
            status: 500
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            failOnStatus: false
          }).then(function(resp) {
            //# make sure it really was 500!
            expect(resp.status).to.eq(500);
            return expect(warning).to.be.calledWith("The cy.request() 'failOnStatus' option has been renamed to 'failOnStatusCode'. Please update your code. This option will be removed at a later time.");
          });
        });
      });
      describe("failOnStatusCode", function() {
        return it("does not fail on status 401", function() {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: false,
            status: 401
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            failOnStatusCode: false
          }).then(function(resp) {
            //# make sure it really was 500!
            return expect(resp.status).to.eq(401);
          });
        });
      });
      describe("method", function() {
        return it.skip("can use M-SEARCH method", function() {
          return cy.request({
            url: 'http://localhost:3500/dump-method',
            method: 'm-Search'
          }).then(function(res) {
            return expect(res.body).to.contain('M-SEARCH');
          });
        });
      });
      describe("headers", function() {
        return it.skip("can send user-agent header", function() {
          return cy.request({
            url: "http://localhost:3500/dump-headers",
            headers: {
              "user-agent": "something special"
            }
          }).then(function(res) {
            return expect(res.body).to.contain('"user-agent":"something special"');
          });
        });
      });
      describe("subjects", function() {
        return it("resolves with response obj", function() {
          var backend, resp;
          resp = {
            status: 200,
            isOkStatusCode: true,
            body: "<html>foo</html>",
            headers: {
              foo: "bar"
            }
          };
          backend = Cypress.backend.withArgs("http:request").resolves(resp);
          return cy.request("http://www.foo.com").then(function(subject) {
            return expect(subject).to.deep.eq(resp);
          });
        });
      });
      describe("timeout", function() {
        beforeEach(function() {
          var backend;
          return backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: true,
            status: 200
          });
        });
        it("sets timeout to Cypress.config(responseTimeout)", function() {
          var timeout;
          Cypress.config("responseTimeout", 2500);
          timeout = cy.spy(Promise.prototype, "timeout");
          return cy.request("http://www.foo.com").then(() => {
            return expect(timeout).to.be.calledWith(2500);
          });
        });
        it("can override timeout", function() {
          var timeout;
          timeout = cy.spy(Promise.prototype, "timeout");
          return cy.request({
            url: "http://www.foo.com",
            timeout: 1000
          }).then(() => {
            return expect(timeout).to.be.calledWith(1000);
          });
        });
        return it("clears the current timeout and restores after success", function() {
          cy.timeout(100);
          cy.spy(cy, "clearTimeout");
          return cy.request("http://www.foo.com").then(function() {
            expect(cy.clearTimeout).to.be.calledWith("http:request");
            //# restores the timeout afterwards
            return expect(cy.timeout()).to.eq(100);
          });
        });
      });
      describe(".log", function() {
        beforeEach(function() {
          cy.on("log:added", (attrs, log) => {
            if (attrs.name === "request") {
              return this.lastLog = log;
            }
          });
          return null;
        });
        it("can turn off logging", function() {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: true,
            status: 200
          });
          return cy.request({
            url: "http://localhost:8080",
            log: false
          }).then(function() {
            return expect(this.lastLog).to.be.undefined;
          });
        });
        it("logs immediately before resolving", function(done) {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: true,
            status: 200
          });
          cy.on("log:added", function(attrs, log) {
            if (log.get("name") === "request") {
              expect(log.get("state")).to.eq("pending");
              expect(log.get("message")).to.eq("");
              return done();
            }
          });
          return cy.request("http://localhost:8080");
        });
        it.skip("snapshots after clicking", function() {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: true,
            status: 200
          });
          return cy.request("http://localhost:8080").then(() => {
            var lastLog;
            lastLog = this.lastLog;
            expect(lastLog.get("snapshots").length).to.eq(1);
            return expect(lastLog.get("snapshots")[0]).to.be.an("object");
          });
        });
        it.skip(".consoleProps", function() {
          var allRequestResponse, backend;
          allRequestResponse = {
            "Request URL": "http://localhost:8080/foo",
            "Request Headers": {
              "x-token": "ab123"
            },
            "Request Body": {
              first: "brian"
            },
            "Response Headers": {
              "Content-Type": "application/json"
            },
            "Response Body": {
              id: 123
            }
          };
          backend = Cypress.backend.withArgs("http:request").resolves({
            duration: 10,
            status: 201,
            isOkStatusCode: true,
            body: {
              id: 123
            },
            headers: {
              "Content-Type": "application/json"
            },
            requestHeaders: {
              "x-token": "ab123"
            },
            requestBody: {
              first: "brian"
            },
            allRequestResponses: [allRequestResponse]
          });
          return cy.request({
            url: "http://localhost:8080/foo",
            headers: {
              "x-token": "abc123"
            },
            method: "POST",
            body: {
              first: "brian"
            }
          }).then(() => {
            return expect(this.lastLog.invoke("consoleProps")).to.deep.eq({
              Command: "request",
              Request: allRequestResponse,
              Yielded: {
                duration: 10,
                status: 201,
                body: {
                  id: 123
                },
                headers: {
                  "Content-Type": "application/json"
                }
              }
            });
          });
        });
        it.skip(".consoleProps with array of allRequestResponses", function() {
          var allRequestResponses, backend;
          allRequestResponses = [
            {
              "Request URL": "http://localhost:8080/foo",
              "Request Headers": {
                "x-token": "ab123"
              },
              "Request Body": {
                first: "brian"
              },
              "Response Headers": {
                "Content-Type": "application/json"
              },
              "Response Body": {
                id: 123
              }
            },
            {
              "Request URL": "http://localhost:8080/foo",
              "Request Headers": {
                "x-token": "ab123"
              },
              "Request Body": {
                first: "brian"
              },
              "Response Headers": {
                "Content-Type": "application/json"
              },
              "Response Body": {
                id: 123
              }
            }
          ];
          backend = Cypress.backend.withArgs("http:request").resolves({
            duration: 10,
            status: 201,
            isOkStatusCode: true,
            body: {
              id: 123
            },
            headers: {
              "Content-Type": "application/json"
            },
            requestHeaders: {
              "x-token": "ab123"
            },
            requestBody: {
              first: "brian"
            },
            allRequestResponses: allRequestResponses
          });
          return cy.request({
            url: "http://localhost:8080/foo",
            headers: {
              "x-token": "abc123"
            },
            method: "POST",
            body: {
              first: "brian"
            }
          }).then(() => {
            return expect(this.lastLog.invoke("consoleProps")).to.deep.eq({
              Command: "request",
              Requests: allRequestResponses,
              Yielded: {
                duration: 10,
                status: 201,
                body: {
                  id: 123
                },
                headers: {
                  "Content-Type": "application/json"
                }
              }
            });
          });
        });
        return describe(".renderProps", function() {
          describe("in any case", function() {
            return it("sends correct message", function() {
              var backend;
              backend = Cypress.backend.withArgs("http:request").resolves({
                isOkStatusCode: true,
                status: 201
              });
              return cy.request("http://localhost:8080/foo").then(() => {
                return expect(this.lastLog.invoke("renderProps").message).to.equal("GET 201 http://localhost:8080/foo");
              });
            });
          });
          describe("when response is successful", function() {
            return it("sends correct indicator", function() {
              var backend;
              backend = Cypress.backend.withArgs("http:request").resolves({
                isOkStatusCode: true,
                status: 201
              });
              return cy.request("http://localhost:8080/foo").then(() => {
                return expect(this.lastLog.invoke("renderProps").indicator).to.equal("successful");
              });
            });
          });
          return describe("when response is outside 200 range", function() {
            return it("sends correct indicator", function(done) {
              var backend;
              cy.on("fail", (err) => {
                expect(this.lastLog.invoke("renderProps").indicator).to.equal("bad");
                return done();
              });
              backend = Cypress.backend.withArgs("http:request").resolves({
                status: 500
              });
              return cy.request("http://localhost:8080/foo");
            });
          });
        });
      });
      return describe("errors", function() {
        beforeEach(function() {
          Cypress.config("defaultCommandTimeout", 50);
          this.logs = [];
          cy.on("log:added", (attrs, log) => {
            if (attrs.name === "request") {
              this.lastLog = log;
              return this.logs.push(log);
            }
          });
          return null;
        });
        it("throws when no url is passed", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() requires a url. You did not provide a url.");
            return done();
          });
          return cy.request();
        });
        it("throws when url is not FQDN", function(done) {
          Cypress.config("baseUrl", "");
          cy.stub(cy, "getRemoteLocation").withArgs("origin").returns("");
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() must be provided a fully qualified url - one that begins with 'http'. By default cy.request() will use either the current window's origin or the 'baseUrl' in 'cypress.json'. Neither of those values were present.");
            return done();
          });
          return cy.request("/foo/bar");
        });
        it("throws when url isnt a string", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() requires the url to be a string.");
            return done();
          });
          return cy.request({
            url: []
          });
        });
        it("throws when auth is truthy but not an object", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() must be passed an object literal for the 'auth' option.");
            return done();
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            auth: "foobar"
          });
        });
        it("throws when headers is truthy but not an object", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() requires the 'headers' option to be an object literal.");
            return done();
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            headers: "foo=bar"
          });
        });
        it("throws on invalid method", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() was called with an invalid method: 'FOO'. Method can be: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, or any other method supported by Node's HTTP parser.");
            return done();
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            method: "FOO"
          });
        });
        it("throws when gzip is not boolean", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() requires the 'gzip' option to be a boolean.");
            return done();
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            gzip: {}
          });
        });
        it("throws when form isnt a boolean", function(done) {
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.eq("cy.request() requires the 'form' option to be a boolean.\n\nIf you're trying to send a x-www-form-urlencoded request then pass either a string or object literal to the 'body' property.");
            return done();
          });
          return cy.request({
            url: "http://localhost:1234/foo",
            form: {
              foo: "bar"
            }
          });
        });
        it("throws when failOnStatusCode is false and retryOnStatusCodeFailure is true", function(done) {
          cy.on("fail", (err) => {
            expect(err.message).to.contain("cy.request() was invoked with { failOnStatusCode: false, retryOnStatusCodeFailure: true }.");
            return done();
          });
          return cy.request({
            url: "http://foobarbaz",
            failOnStatusCode: false,
            retryOnStatusCodeFailure: true
          });
        });
        it("throws when status code doesnt start with 2 and failOnStatusCode is true", function(done) {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: false,
            status: 500,
            statusText: "Server Error",
            headers: {
              baz: "quux"
            },
            body: "response body",
            requestHeaders: {
              foo: "bar"
            },
            requestBody: "request body",
            redirects: ["301: http://www.google.com"]
          });
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.include("cy.request() failed on:\n\nhttp://localhost:1234/foo\n\nThe response we received from your web server was:\n\n  > 500: Server Error\n\nThis was considered a failure because the status code was not '2xx' or '3xx'.\n\nIf you do not want status codes to cause failures pass the option: 'failOnStatusCode: false'\n\n-----------------------------------------------------------\n\nThe request we sent was:\n\nMethod: POST\nURL: http://localhost:1234/foo\nHeaders: {\n  \"foo\": \"bar\"\n}\nBody: request body\nRedirects: [\n  \"301: http://www.google.com\"\n]\n\n-----------------------------------------------------------\n\nThe response we got was:\n\nStatus: 500 - Server Error\nHeaders: {\n  \"baz\": \"quux\"\n}\nBody: response body");
            return done();
          });
          return cy.request({
            method: "POST",
            url: "http://localhost:1234/foo",
            body: {
              username: "cypress"
            }
          });
        });
        it("does not include redirects when there were no redirects", function(done) {
          var backend;
          backend = Cypress.backend.withArgs("http:request").resolves({
            isOkStatusCode: false,
            status: 500,
            statusText: "Server Error",
            headers: {
              baz: "quux"
            },
            body: "response body",
            requestHeaders: {
              foo: "bar"
            },
            requestBody: "request body"
          });
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            expect(err.message).to.include("cy.request() failed on:\n\nhttp://localhost:1234/foo\n\nThe response we received from your web server was:\n\n  > 500: Server Error\n\nThis was considered a failure because the status code was not '2xx' or '3xx'.\n\nIf you do not want status codes to cause failures pass the option: 'failOnStatusCode: false'\n\n-----------------------------------------------------------\n\nThe request we sent was:\n\nMethod: POST\nURL: http://localhost:1234/foo\nHeaders: {\n  \"foo\": \"bar\"\n}\nBody: request body\n\n-----------------------------------------------------------\n\nThe response we got was:\n\nStatus: 500 - Server Error\nHeaders: {\n  \"baz\": \"quux\"\n}\nBody: response body");
            return done();
          });
          return cy.request({
            method: "POST",
            url: "http://localhost:1234/foo",
            body: {
              username: "cypress"
            }
          });
        });
        it("logs once on error", function(done) {
          var backend, error;
          error = new Error("request failed");
          error.backend = true;
          backend = Cypress.backend.withArgs("http:request").rejects(error);
          cy.on("fail", (err) => {
            var lastLog;
            lastLog = this.lastLog;
            expect(this.logs.length).to.eq(1);
            expect(lastLog.get("error")).to.eq(err);
            expect(lastLog.get("state")).to.eq("failed");
            return done();
          });
          return cy.request("http://localhost:1234/foo");
        });
        return context("displays error", function() {
          it("displays method and url in error", function(done) {
            var backend, error;
            error = new Error("request failed");
            error.backend = true;
            backend = Cypress.backend.withArgs("http:request").rejects(error);
            cy.on("fail", (err) => {
              expect(err.message).to.include("cy.request() failed trying to load:\n\nhttp://localhost:1234/foo\n\nWe attempted to make an http request to this URL but the request failed without a response.\n\nWe received this error at the network level:\n\n  > request failed\n\n-----------------------------------------------------------\n\nThe request we sent was:\n\nMethod: GET\nURL: http://localhost:1234/foo\n\n-----------------------------------------------------------\n\nCommon situations why this would fail:\n  - you don't have internet access\n  - you forgot to run / boot your web server\n  - your web server isn't accessible\n  - you have weird network configuration settings on your computer\n\nThe stack trace for this error is:");
              return done();
            });
            return cy.request("http://localhost:1234/foo");
          });
          return it("throws after timing out", function(done) {
            var backend;
            backend = Cypress.backend.withArgs("http:request").resolves(Promise.delay(1000));
            cy.on("fail", (err) => {
              var lastLog;
              lastLog = this.lastLog;
              expect(this.logs.length).to.eq(1);
              expect(lastLog.get("error")).to.eq(err);
              expect(lastLog.get("state")).to.eq("failed");
              expect(err.message).to.eq("cy.request() timed out waiting 50ms for a response from your server.\n\nThe request we sent was:\n\nMethod: GET\nURL: http://localhost:1234/foo\n\nNo response was received within the timeout.");
              return done();
            });
            return cy.request({
              url: "http://localhost:1234/foo",
              timeout: 50
            });
          });
        });
      });
    });
  });
}).call(this);
