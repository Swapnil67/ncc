#include <stdio.h> 
#include <stdlib.h>
#include <fcntl.h> // * the open system call is here
#include <unistd.h> // * to get some more system calls like read, lseek and more
 
// * This will just loop through every byte of our allocated memory and log the values in hex.
// * It's just like printing a buffer in Node.js
void printBufferInHex(const char *buffer, size_t size) {
    for (size_t i = 0; i < size; ++i) {
        printf("%02X ", (unsigned char)buffer[i]);
    }
    printf("\n");
}
 
int main() {
    // * Open the file for reading using the open system call
    int file_descriptor = open("./file.txt", O_RDONLY);
 
    // * Just some error handling in case the file does not exist
    if (file_descriptor == -1) {
      perror("Error opening file");
      exit(1); // exit the process, and 1 means that an error has happened
    }

    // * Determine the size of the file, file_size will be a number in bytes
    off_t file_size = lseek(file_descriptor, 0, SEEK_END); // lseek is another system call
    lseek(file_descriptor, 0, SEEK_SET);
     
    // * We could print the file_size to the terminal like this:
    printf("Size of file: %lld", file_size);
    printf("\n");

    // * Allocate memory to store the file content.
    // * This is just like creating buffers in Node.js.
    char *buffer = (char *)malloc(file_size);

    // * In some rare cases a memory allocation could not be successful. For example, we might not have enough memory available.
    // * So this will handle those cases.
    if (buffer == NULL) {
			perror("Error allocating memory");
			close(file_descriptor);
			exit(1); // exit the process, and 1 means that an error has happened
    }

    // * Read the file content into the buffer using the read system call
    // * This is just like reading a file in Node.js and getting a buffer
    ssize_t bytes_read = read(file_descriptor, buffer, file_size);
 
    // * Some more error handling in case the read was not successful 
    if (bytes_read != file_size) {
			perror("Error reading from file");
			free(buffer);
			close(file_descriptor);
			exit(1); // * exit the process, and 1 means that an error has happened
    }

    // * At this point, 'buffer' contains the binary content of the file. We can do whatever we want with it, 
    // * let's just log it to the terminal!
    // * You can imagine that we can now give this buffer to maybe JavaScript (if we are embedding v8) and now JavaScript 
    // * has this exact data!
    printf("Buffer Content (in hex): ");
    printBufferInHex(buffer, bytes_read);

		// * Don't forget to free the allocated memory and close the file descriptor. We don't want to end up with memory leaks! 
    free(buffer);
    close(file_descriptor);
 
    exit(0); // * This means to exit the process and 0 means that everything was successful 

}