import React from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
export default function RTE({ name, control, label, defaultValue = '' }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                // defaultValue={defaultValue}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey='tw6tq75iwpm5sjrh2kmp4rld3z2fxt812x46pwu8medf3u3p'
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />

                )}
            />
        </div>
    )
}

/*
Using Controller

    Simplifies Integration: Controller from react-hook-form helps integrate controlled components like TinyMCE with form state management.
    Automatic State Management: It automatically manages the form state and synchronizes it with the editor's value. You don’t need to use useState to manually track the editor’s content.
    Handles Updates: Controller takes care of updating the form state when the editor’s content changes and handles the registration of the input field in the form context.

Without Controller

    Manual State Management: You need to manually manage the editor’s value using useState or similar state management techniques.
    Direct Updates: You manually synchronize the editor’s content with the form state using functions like setValue from react-hook-form.
    More Boilerplate: Handling synchronization and updates yourself involves more code and potential for errors.

In summary, using Controller abstracts away the manual state management and provides a cleaner, more integrated way to manage form values for components like TinyMCE.
*/


/*
Initial Value: defaultValue provides the initial content to the editor, fetched from the form state using getValues.
Content Updates: The onEditorChange function updates the form state whenever the content in the TinyMCE editor changes.
Form Integration: Controller manages the connection between TinyMCE and react-hook-form, ensuring that form state is consistent with the editor's content.
*/