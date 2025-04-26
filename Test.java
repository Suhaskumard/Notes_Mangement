interface MathOperation {
    static int add(int a, int b) {
        return a + b;
    }

    static int square(int a) {
        return a * a;
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(MathOperation.add(5, 3));  // Output: 8
        System.out.println(MathOperation.square(4));  // Output: 16
    }
}
