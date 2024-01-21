using System.Net;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var allowSpecificOrigins = "arbitraryName";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173");
        }
        );
});

var app = builder.Build();

var humanCapitalItems = new HumanCapitalItems[] {
    new(1, "My Paystubs"),
    new(2, "My Benefits"),
    new(3, "My Leave Requests"),
    new(4, "My Timesheet"),
    new(5, "Approve Leave Requests"),
    new(6, "Approve Timesheets")
};

var erpMapsItems = new ErpApps[] {
     new(1, "Approve Requisitions"),
    new(2, "Order From Requisitions"),
    new(3, "Approve Purchase Orders")
};

var humanCapitalApi = app.MapGroup("/human-capital-items");
humanCapitalApi.MapGet("/", () => humanCapitalItems);

var erpMapsApi = app.MapGroup("/erp-map-items");
erpMapsApi.MapGet("/", () => erpMapsItems);



app.UseCors(allowSpecificOrigins);

app.Run();

public record HumanCapitalItems(int Id, string Name);

public record ErpApps(int Id, string Name);


[JsonSerializable(typeof(HumanCapitalItems[]))]

[JsonSerializable(typeof(ErpApps[]))]

internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
