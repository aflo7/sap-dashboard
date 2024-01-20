using System.Net;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

var sampleTodos = new Todo[] {
    new(1, "Walk the dog"),
    new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
    new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
    new(4, "Clean the bathroom"),
    new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
};

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


var todosApi = app.MapGroup("/todos");
todosApi.MapGet("/", () => sampleTodos);
todosApi.MapGet("/{id}", (int id) =>
    sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
        ? Results.Ok(todo)
        : Results.NotFound());

var humanCapitalApi = app.MapGroup("/human-capital-items");
humanCapitalApi.MapGet("/", () => humanCapitalItems);

var erpMapsApi = app.MapGroup("/erp-map-items");
erpMapsApi.MapGet("/", () => erpMapsItems);

app.Run();

public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);
public record HumanCapitalItems(int Id, string Name);

public record ErpApps(int Id, string Name);

[JsonSerializable(typeof(Todo[]))]

[JsonSerializable(typeof(HumanCapitalItems[]))]

[JsonSerializable(typeof(ErpApps[]))]

internal partial class AppJsonSerializerContext : JsonSerializerContext
{

}
