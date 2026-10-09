import java.util.Scanner;

public class App {

    static String[] passengerNames = new String[10];
    static int[] seatNumbers = new int[10];
    static int bookedSeats = 0;

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("================================");
        System.out.println("       RAIL YATRA");
        System.out.println(" Railway Reservation System");
        System.out.println("================================");

        while (true) {

            System.out.println("\n1. Book Ticket");
            System.out.println("2. View Reservations");
            System.out.println("3. Cancel Ticket");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    bookTicket(sc);
                    break;

                case 2:
                    viewReservations();
                    break;

                case 3:
                    cancelTicket(sc);
                    break;

                case 4:
                    System.out.println("Thank you for using Rail Yatra!");
                    sc.close();
                    return;

                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    // Book a railway ticket
    static void bookTicket(Scanner sc) {

        if (bookedSeats == 10) {
            System.out.println("Sorry! All seats are booked.");
            return;
        }

        System.out.print("Enter passenger name: ");
        String name = sc.nextLine();

        passengerNames[bookedSeats] = name;
        seatNumbers[bookedSeats] = bookedSeats + 1;

        System.out.println("Ticket booked successfully!");
        System.out.println("Passenger Name: " + name);
        System.out.println("Seat Number: " + seatNumbers[bookedSeats]);

        bookedSeats++;
    }

    // Display all reservations
    static void viewReservations() {

        if (bookedSeats == 0) {
            System.out.println("No reservations found.");
            return;
        }

        System.out.println("\n----- Reservations -----");

        for (int i = 0; i < bookedSeats; i++) {
            System.out.println(
                "Seat " + seatNumbers[i] +
                " - Passenger: " + passengerNames[i]
            );
        }
    }

    // Cancel a ticket
    static void cancelTicket(Scanner sc) {

        if (bookedSeats == 0) {
            System.out.println("No tickets available to cancel.");
            return;
        }

        System.out.print("Enter seat number to cancel: ");
        int seat = sc.nextInt();

        int index = -1;

        for (int i = 0; i < bookedSeats; i++) {
            if (seatNumbers[i] == seat) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            System.out.println("Seat not found.");
            return;
        }

        for (int i = index; i < bookedSeats - 1; i++) {
            passengerNames[i] = passengerNames[i + 1];
            seatNumbers[i] = seatNumbers[i + 1];
        }

        bookedSeats--;

        System.out.println("Ticket cancelled successfully.");
    }
}