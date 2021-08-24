# reactivities

**Make Directory**
mkdir Reactivities

**Create Blank Solution**
dotnet new sln

**Create new Projects**
dotnet new webapi -n API
dotnet new classlib -n Application
dotnet new classlib -n Domain
dotnet new classlib -n Persistence

**Add Projects to the solution**
dotnet sln add API/API.csproj
dotnet sln add Application
dotnet sln add Persistence
dotnet sln add Domain

**List all projects in solution**
dotnet sln list

**Add Reference to API project**
cd API
dotnet add reference ../Application

**Add Reference to Application project**
cd..
cd Application
dotnet add reference ../Persistence
dotnet add reference ../Domain

**Add Reference to Persistence project**
cd ..
cd Persistence
dotnet add reference ../Domain

