import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Scanner;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class AppTest {

    // Reset data before every test
    @BeforeEach
    void resetData() {
        App.bookedSeats = 0;

        for (int i = 0; i < 10; i++) {
            App.passengerNames[i] = null;
            App.seatNumbers[i] = 0;
        }
    }

    // Test Case 1: Book one ticket
    @Test
    void testTicketBooking() {

        Scanner sc = new Scanner("Thushar\n");

        App.bookTicket(sc);

        assertEquals(1, App.bookedSeats);
        assertEquals("Thushar", App.passengerNames[0]);
        assertEquals(1, App.seatNumbers[0]);

        sc.close();
    }

    // Test Case 2: Book multiple tickets
    @Test
    void testMultipleTicketBooking() {

        Scanner sc = new Scanner("Thushar\nDharshan\n");

        App.bookTicket(sc);
        App.bookTicket(sc);

        assertEquals(2, App.bookedSeats);
        assertEquals("Thushar", App.passengerNames[0]);
        assertEquals("Dharshan", App.passengerNames[1]);
        assertEquals(1, App.seatNumbers[0]);
        assertEquals(2, App.seatNumbers[1]);

        sc.close();
    }

    // Test Case 3: Cancel a ticket
    @Test
    void testTicketCancellation() {

        Scanner sc = new Scanner("Thushar\n");

        // First book a ticket
        App.bookTicket(sc);

        assertEquals(1, App.bookedSeats);

        // Cancel seat number 1
        Scanner cancelScanner = new Scanner("1\n");

        App.cancelTicket(cancelScanner);

        assertEquals(0, App.bookedSeats);

        cancelScanner.close();
        sc.close();
    }

    // Test Case 4: Maximum 10 seats
    @Test
    void testMaximumSeats() {

        String input =
                "Passenger1\n" +
                "Passenger2\n" +
                "Passenger3\n" +
                "Passenger4\n" +
                "Passenger5\n" +
                "Passenger6\n" +
                "Passenger7\n" +
                "Passenger8\n" +
                "Passenger9\n" +
                "Passenger10\n" +
                "Passenger11\n";

        Scanner sc = new Scanner(input);

        // Book 10 seats
        for (int i = 0; i < 10; i++) {
            App.bookTicket(sc);
        }

        // 10 seats should be booked
        assertEquals(10, App.bookedSeats);

        // Try to book 11th seat
        App.bookTicket(sc);

        // Still only 10 seats
        assertEquals(10, App.bookedSeats);

        sc.close();
    }
}