type GetTestingRequest = {
  name: string;
  message: string;
};

type ResponseSuccessfulTestResult = {
  date: Date;
  number: number;
};

function getTesting(
  object: GetTestingRequest
): ResponseSuccessfulTestResult | undefined {
  try {
    if (object.name.length < 2) {
      throw "Too short name";
    }
    const result = 2 + object.name.length;

    return {
      date: new Date(),
      number: result,
    };
  } catch (error) {
    console.error(error);
  }
}

describe("getZodiac", () => {
  const successfulObject = {
    name: "Niki",
    message: "Gosho",
  };
  test("should return object current time and calculated number from name length + 2", () => {
    const result = getTesting(successfulObject);

    expect(result).toBeDefined();
    expect(typeof result !== "undefined" && result.number === 6).toStrictEqual(
      true
    );
    expect(
      typeof result !== "undefined" && typeof result.date !== "undefined"
    ).toStrictEqual(true);
  });
  test("should return undefined due to error", () => {
    const result = getTesting({ ...successfulObject, name: "v" });

    expect(result).toBeUndefined();
  });
  //   test("should return undefined due to error", () => {
  //     const result = getTesting({ ...successfulObject, name: "v" });
  //     expect(result).toBeUndefined();
  //   });
});
