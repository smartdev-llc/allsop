# API
    https://appsopapi.azurewebsites.net/
    https://appsopapi.azurewebsites.net/swagger/index.html
# Angular app
    https://mango-bay-093940b03.1.azurestaticapps.net/

# Run the app on localhost
- Requirements
    - .NET core sdk 2.1
    - Visual studio 2017 or newer
    - Nodejs to build and run angular 14
    - Please re-store npm packages before run the angular app. Yarn is recommended instead of npm to restore npm packages
- To run the app, need to run both api project and angular project
    - Web api project: 
        - https://localhost:5001
        - swagger: https://localhost:5001/swagger/index.html
        - A simple web api application. All data is mocked using data in memory. There are repositories are used to separate business logic from data access implementation
        - Almost cart data and logic are implemented at backend. That make it easier to develop and more reliable.
        - There are a list of running promotions that are specified by `IPromotionProvider` interface. With this design, it is easy to add/remove/modify a promotion.
    - Angular project: http://localhost:4200
        - Utilize `ngrx` to manage application state. Basically, if there are data components that are accessed/refered by some UI parts, let's consider using `ngrx` or `redux` to manage that data.
        - `ngrx/redux` requires some additional/verbose code but if use it correctly, the application state management and complexity will be under control when the app grown and be bigger by time. Easier to maintain and develop
        - The current design share `domain model` design between backend and front-end, that make front-end and backend developers be closer, easier to share the ideas when developing
        - To make `domain model` sharing is possible and to make it easier and more reliable to access/query data from the `store`:
            - normalize all composite data from the server before storing it into the `store`. The final result we get a small copy of relationship database in the front-end application (check in `allsopweb\src\app\entities` and `allsopweb\src\app\services\http`)
            - normalize the way how to access data from the `store` in the front-end application by take advantage some ideas from backend development likes: `data repository` (check in `allsopweb\src\app\store`)
