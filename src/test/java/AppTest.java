import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class AppTest {

    @Test
    public void testAdd() {
        assertEquals(10, App.add(5, 5));
    }

    @Test
    public void testMultiply() {
        assertEquals(20, App.multiply(4, 5));
    }
}