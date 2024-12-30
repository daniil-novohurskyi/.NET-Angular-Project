namespace Utilities;

using System;
using System.Text;

public static class IsbnGenerator
{
    public static string GenerateIsbn13()
    {
        var random = new Random();
        var sb = new StringBuilder("978"); // Prefix for ISBN-13

        // Generate first 9 digits (after the prefix)
        for (int i = 0; i < 9; i++)
        {
            sb.Append(random.Next(0, 10));
        }

        // Calculate the checksum digit
        string isbnWithoutChecksum = sb.ToString();
        int checksum = CalculateIsbn13Checksum(isbnWithoutChecksum);

        // Append the checksum to complete the ISBN
        sb.Append(checksum);

        return sb.ToString();
    }

    private static int CalculateIsbn13Checksum(string isbnWithoutChecksum)
    {
        int sum = 0;

        for (int i = 0; i < isbnWithoutChecksum.Length; i++)
        {
            int digit = int.Parse(isbnWithoutChecksum[i].ToString());
            sum += (i % 2 == 0) ? digit : digit * 3;
        }

        int remainder = sum % 10;
        return remainder == 0 ? 0 : 10 - remainder;
    }
}
